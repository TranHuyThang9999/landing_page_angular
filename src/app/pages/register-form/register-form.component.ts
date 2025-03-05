import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FileUploadComponent } from '../../components/file-upload/file-upload.component';
import { environment } from '../../../../environment';

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
  showPassword = false;

  user = {
    name: '',
    email: '',
    password: '',
    AvatarUrl: ''
  };

  constructor(private http: HttpClient) { }

  registerUser(form: NgForm) {
    if (form.invalid) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    if (this.fileUpload && this.fileUpload.selectedFiles.length > 0) {
      this.fileUpload.uploadFiles().then(uploadedUrls => {
        if (uploadedUrls.length > 0) {
          this.user.AvatarUrl = uploadedUrls[0];
        }
        this.submitRegistration();
      }).catch(error => {
        console.error('File upload failed', error);
        alert('Lỗi tải file!');
      });
    } else {
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
          alert('Đăng ký thất bại!');
        }
      });
  }

  onFileUploadComplete(urls: string[]) {
    if (urls.length > 0) {
      this.user.AvatarUrl = urls[0];
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
