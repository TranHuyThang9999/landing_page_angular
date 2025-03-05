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
        let responseData: any = {};

        try {
            responseData = await response.json();
        } catch (e) {
            // console.error("Error parsing response:", e);
        }

        if (!response.ok) {

            if (response.status === 401) {
                localStorage.removeItem('token');
                this.router.navigate(['/']);
            }

            throw {
                message: responseData.message || `HTTP Error! Status: ${response.status}`,
                status: response.status,
                data: responseData
            };
        }

        if (responseData.code !== 0) {
            throw {
                message: responseData.message || `API Error! Code: ${responseData.code}`,
                status: responseData.code,
                data: responseData
            };
        }

        return responseData;
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
