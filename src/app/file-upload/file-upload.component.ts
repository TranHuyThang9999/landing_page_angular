import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzUploadChangeParam, NzUploadModule, NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';

// Helper function to convert file to Base64 for preview
const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

@Component({
  selector: 'nz-demo-upload-picture-card',
  standalone: true,
  imports: [
    NzButtonModule,
    NzIconModule,
    NzUploadModule,
    NzModalModule
  ],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {

  previewImage: string | undefined = '';
  previewVisible = false;
  selectedFiles: NzUploadFile[] = [];

  constructor(private http: HttpClient, private messageService: NzMessageService) {}

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status === 'removed') {
      this.selectedFiles = this.selectedFiles.filter(f => f.uid !== info.file.uid);
    } else {
      this.selectedFiles = [...this.selectedFiles, info.file];
    }
    console.log('Selected Files:', this.selectedFiles);
  }

  getPresignedUrls(fileNames: string[]): Observable<Record<string, string>> {
    return new Observable((observer: Observer<Record<string, string>>) => {
      this.http.post<{ presignedUrls: Record<string, string> }>('http://localhost:5227/api/minio/presigned-urls', fileNames)
        .subscribe(response => {
          observer.next(response.presignedUrls);
          observer.complete();
        }, error => {
          observer.error(error);
        });
    });
  }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): boolean => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      this.messageService.error('You can only upload JPG/PNG files!');
      return false;
    }
    const isLt2M = file.size! / 1024 / 1024 < 2;
    if (!isLt2M) {
      this.messageService.error('Image must be smaller than 2MB!');
      return false;
    }
    return true;
  };

  uploadFiles(): void {
    if (this.selectedFiles.length === 0) {
      this.messageService.warning('Please select at least one file to upload.');
      return;
    }

    const fileNames = this.selectedFiles.map(file => file.name);

    this.getPresignedUrls(fileNames).subscribe(presignedUrls => {
      this.selectedFiles.forEach(file => {
        const presignedUrl = presignedUrls[file.name];
        if (!presignedUrl) {
          this.messageService.error(`No presigned URL found for ${file.name}`);
          return;
        }

        fetch(presignedUrl, {
          method: 'PUT',
          body: file.originFileObj!,
          headers: { 'Content-Type': file.type || 'application/octet-stream' }
        })
        .then(() => {
          this.messageService.success(`${file.name} uploaded successfully`);
        })
        .catch(() => {
          this.messageService.error(`Failed to upload ${file.name}`);
        });
      });
    }, () => {
      this.messageService.error('Failed to get presigned URLs');
    });
  }

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file['preview']) {
      file['preview'] = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };
}
