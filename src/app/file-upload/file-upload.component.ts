import { HttpClient } from '@angular/common/http';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzUploadChangeParam, NzUploadModule, NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

interface FileMapItem {
  originalFile: NzUploadFile;
  uuid: string;
}

@Component({
  selector: 'app-file-upload',
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
  @Output() uploadComplete = new EventEmitter<string[]>();
  @Input() apiEndpoint: string = 'http://localhost:5227/api/minio/presigned-urls';
  @Input() maxFileCount: number = 5;

  previewImage: string | undefined = '';
  previewVisible = false;
  selectedFiles: FileMapItem[] = [];
  uploadedUrls: string[] = [];

  constructor(
    private http: HttpClient, 
    private messageService: NzMessageService
  ) {}

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status === 'removed') {
      this.selectedFiles = this.selectedFiles.filter(f => f.originalFile.uid !== info.file.uid);
    } else {
      const fileExtension = this.getFileExtension(info.file.name);
      const uuid = `${uuidv4()}${fileExtension ? `.${fileExtension}` : ''}`;
      this.selectedFiles.push({ 
        originalFile: info.file, 
        uuid 
      });
    }
    console.log('Selected Files:', this.selectedFiles);
  }

  getPresignedUrls(uuids: string[]): Observable<Record<string, string>> {
    return new Observable((observer: Observer<Record<string, string>>) => {
      this.http.post<{ presignedUrls: Record<string, string> }>(
        this.apiEndpoint, 
        uuids
      ).subscribe({
        next: response => {
          observer.next(response.presignedUrls);
          observer.complete();
        },
        error: error => {
          observer.error(error);
        }
      });
    });
  }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): boolean => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      this.messageService.error('You can only upload JPG/PNG files!');
      return false;
    }
    const isLt50M = file.size! / 1024 / 1024 < 50;
    if (!isLt50M) {
      this.messageService.error('Image must be smaller than 50MB!');
      return false;
    }
    return true;
  };

  uploadFiles(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      if (this.selectedFiles.length === 0) {
        this.messageService.warning('Please select at least one file to upload.');
        resolve([]);
        return;
      }

      this.uploadedUrls = [];
      const uuids = this.selectedFiles.map(file => file.uuid);

      this.getPresignedUrls(uuids).subscribe(
        presignedUrls => {
          const uploadPromises = this.selectedFiles.map(fileItem => {
            const presignedUrl = presignedUrls[fileItem.uuid];
            if (!presignedUrl) {
              this.messageService.error(`No presigned URL found for ${fileItem.uuid}`);
              return Promise.reject(`No URL for ${fileItem.uuid}`);
            }

            return fetch(presignedUrl, {
              method: 'PUT',
              body: fileItem.originalFile.originFileObj!,
              headers: { 'Content-Type': fileItem.originalFile.type || 'application/octet-stream' }
            })
            .then(() => {
              const uploadedUrl = `http://localhost:9000/demo/${encodeURIComponent(fileItem.uuid)}`;
              this.uploadedUrls.push(uploadedUrl);
              this.messageService.success(`${fileItem.originalFile.name} uploaded successfully`);
              return uploadedUrl;
            })
            .catch(() => {
              this.messageService.error(`Failed to upload ${fileItem.originalFile.name}`);
              return null;
            });
          });

          Promise.all(uploadPromises)
            .then(urls => {
              const validUrls = urls.filter(url => url !== null);
              this.uploadComplete.emit(validUrls);
              resolve(validUrls);
            })
            .catch(reject);
        }, 
        () => {
          this.messageService.error('Failed to get presigned URLs');
          reject([]);
        }
      );
    });
  }

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file['preview']) {
      file['preview'] = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };

  getFileExtension(filename: string): string {
    return filename.split('.').pop() || '';
  }
}