import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FetchApiInstanceService } from '../../utils/fetch_api.service';

@Component({
  selector: 'app-create-ticket',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FileUploadComponent,
    NzUploadModule,
    NzIconModule,
    NzModalModule
  ],
  templateUrl: './create-ticket.component.html',
  styleUrl: './create-ticket.component.css'
})
export class CreateTicketComponent {
  ticket = {
    name: '',
    fileDescription: '',
    description: ''
  };

  @Output() ticketCreated = new EventEmitter<any>(); 

  @ViewChild(FileUploadComponent) fileUpload!: FileUploadComponent;

  constructor(private apiService: FetchApiInstanceService) {}

  async createTicket(form: NgForm) {
    if (form.invalid) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    if (this.fileUpload && this.fileUpload.selectedFiles?.length > 0) {
      try {
        const uploadedUrls = await this.fileUpload.uploadFiles();
        if (uploadedUrls.length > 0) {
          this.ticket.fileDescription = uploadedUrls[0];
        }
      } catch (error) {
        console.error('Lỗi tải file', error);
        alert('Lỗi tải file!');
        return;
      }
    }

    await this.submitRegistration();
  }

  private async submitRegistration() {
    try {
      const response = await this.apiService.post<{ data: string, message: string, code: number }>('ticket/create', {
        name: this.ticket.name,
        fileDescription: this.ticket.fileDescription,
        description:this.ticket.description
      });

      if (response.code === 0) {
        this.ticketCreated.emit(response.data);
        alert('Tạo ticket thành công!');
      } else {
        alert(response.message || 'Có lỗi xảy ra!');
      }
    } catch (error) {
      console.error('Lỗi khi tạo ticket', error);
      alert('Lỗi kết nối server!');
    }
  }

  onFileUploadComplete(urls: string[]) {
    if (urls.length > 0) {
      this.ticket.fileDescription = urls[0];
    }
  }
}
