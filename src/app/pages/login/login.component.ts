import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FetchApiInstanceService } from '../../utils/fetch_api.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent {
    userName: string = '';
    password: string = '';

    constructor(
        private apiService: FetchApiInstanceService,
        private message: NzMessageService,
        private router: Router,
    ) { }


    async login(event: Event) {
        event.preventDefault();

        try {
            const response = await this.apiService.post<{ data: string, message: string, code: number }>('user/login', {
                userName: this.userName,
                password: this.password
            });

            if (response.code === 0) {
                localStorage.setItem('token', response.data);
                this.message.success("Đăng nhập thành công!");
                this.router.navigate(['/profile']);
            }
        } catch (error: any) {
            const code = error.data?.code ?? error.code;

            if (code === 4) {
                this.message.info("Tài khoản hoặc mật khẩu không đúng. Vui lòng thử lại.");
            }
            else {
                this.message.error("lỗi hệ thống vui lòng thử lại");
            }
        }
    }




}
