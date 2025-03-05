import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environment';

@Injectable({
    providedIn: 'root'
})
export class FetchApiInstanceService {
    private baseUrl: string = environment.apiUrl;

    constructor(private router: Router) { }

    private getToken(): string | null {
        return localStorage.getItem('token');
    }

    private getHeaders(customHeaders?: HeadersInit): Headers {
        const headers = new Headers(customHeaders);
        headers.set('Content-Type', 'application/json');
        const token = this.getToken();
        if (token && !headers.has('Authorization')) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        if (response.status === 401) {
            // Xóa token và điều hướng về trang chủ
            localStorage.removeItem('token');
            this.router.navigate(['/home']);
            throw new Error('Unauthorized! Redirecting to home.');
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }

    async get<T>(endpoint: string): Promise<T> {
        const response = await fetch(`${this.baseUrl}/${endpoint}`, {
            method: 'GET',
            headers: this.getHeaders()
        });
        return this.handleResponse<T>(response);
    }

    async post<T>(endpoint: string, data: any): Promise<T> {
        const response = await fetch(`${this.baseUrl}/${endpoint}`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data)
        });
        return this.handleResponse<T>(response);
    }

    async put<T>(endpoint: string, data: any): Promise<T> {
        const response = await fetch(`${this.baseUrl}/${endpoint}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(data)
        });
        return this.handleResponse<T>(response);
    }

    async delete<T>(endpoint: string): Promise<T> {
        const response = await fetch(`${this.baseUrl}/${endpoint}`, {
            method: 'DELETE',
            headers: this.getHeaders()
        });
        return this.handleResponse<T>(response);
    }
}
