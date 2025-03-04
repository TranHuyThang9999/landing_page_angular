import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environment';
import { FileUploadComponent } from '../file-upload/file-upload.component'; // Adjust the import path
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    FileUploadComponent,
    NzUploadModule,
    NzIconModule,
    NzModalModule
  ],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  @ViewChild(FileUploadComponent) fileUpload!: FileUploadComponent;

  user = {
    name: '',
    email: '',
    password: '',
    AvatarUrl: ''
  };

  constructor(private http: HttpClient) { }

  registerUser() {
    // If there are uploaded files, get their URLs first
    if (this.fileUpload && this.fileUpload.selectedFiles.length > 0) {
      this.fileUpload.uploadFiles().then(uploadedUrls => {
        // Use the first uploaded URL as the avatar
        if (uploadedUrls.length > 0) {
          this.user.AvatarUrl = uploadedUrls[0];
        }
        
        // Proceed with registration
        this.submitRegistration();
      }).catch(error => {
        console.error('File upload failed', error);
        alert('Lỗi tải file!');
      });
    } else {
      // If no files, proceed with registration directly
      this.submitRegistration();
    }
  }

  private submitRegistration() {
    this.http.post(`${environment.apiUrl}/user/register`, this.user)
      .subscribe({
        next: (response) => {
          console.log(response);
          alert('Đăng ký thành công!');
        },
        error: (error) => {
          console.error('Lỗi khi đăng ký:', error);
          alert('Đăng ký thất bại!');
        }
      });
  }

  // Optional: Handle file upload complete event
  onFileUploadComplete(urls: string[]) {
    if (urls.length > 0) {
      this.user.AvatarUrl = urls[0];
    }
  }
}