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
                localStorage.removeItem('userProfile');
                window.location.href = '/login';
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
        return this.fetchWithTimeout<T>(`${this.baseUrl}/${endpoint}`, {
            method: 'GET',
            headers: this.getHeaders()
        });
    }

    async post<T>(endpoint: string, data: any): Promise<T> {
        return this.fetchWithTimeout<T>(`${this.baseUrl}/${endpoint}`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data)
        });
    }

    async put<T>(endpoint: string, data: any): Promise<T> {
        return this.fetchWithTimeout<T>(`${this.baseUrl}/${endpoint}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(data)
        });
    }

    async patch<T>(endpoint: string, data: any): Promise<T> {
        return this.fetchWithTimeout<T>(`${this.baseUrl}/${endpoint}`, {
            method: 'PATCH',
            headers: this.getHeaders(),
            body: JSON.stringify(data)
        });
    }


    async delete<T>(endpoint: string): Promise<T> {
        return this.fetchWithTimeout<T>(`${this.baseUrl}/${endpoint}`, {
            method: 'DELETE',
            headers: this.getHeaders()
        });
    }

    async fetchWithTimeout<T>(url: string, options: RequestInit, timeout: number = 10000): Promise<T> {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(url, { ...options, signal: controller.signal });
            return this.handleResponse<T>(response);
        } catch (error: any) {
            if (error.name === 'AbortError') {
                throw new Error('Request timeout! Máy chủ không phản hồi.');
            }
            throw error;
        } finally {
            clearTimeout(timeoutId);
        }
    }
}
