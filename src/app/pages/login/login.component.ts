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
    providers: [NzMessageService]
})
export class LoginComponent {
    userName: string = '';
    password: string = '';
    errorMessage: string = '';

    constructor(
        private apiService: FetchApiInstanceService,
        private router: Router,
    ) { }


    async login(event: Event) {
        event.preventDefault();
        this.errorMessage = '';

        try {
            const response = await this.apiService.post<{ data: string, message: string, code: number }>('user/login', {
                userName: this.userName,
                password: this.password
            });

            if (response.code === 0) {
                localStorage.setItem('token', response.data);
                this.router.navigate(['/profile']);
            }
        } catch (error: any) {
            const code = error.data?.code ?? error.code;

            if (code === 4) {
                this.errorMessage = "Tài khoản hoặc mật khẩu không đúng. Vui lòng thử lại.";
            }
            else {

                this.errorMessage = error.message || "Đăng nhập thất bại.";
            }
        }
    }




}
