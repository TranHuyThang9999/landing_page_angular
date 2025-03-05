import { Injectable } from '@angular/core';
import { environment } from '../../../environment';

@Injectable({
    providedIn: 'root'
})
export class FetchApiInstanceService {
    private baseUrl: string = environment.apiUrl;

    constructor() { }

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

    async get<T>(endpoint: string): Promise<T> {
        const response = await fetch(`${this.baseUrl}/${endpoint}`, {
            method: 'GET',
            headers: this.getHeaders()
        });
        if (!response.ok) {
            throw new Error(`HTTP GET error! status: ${response.status}`);
        }
        return await response.json();
    }

    async post<T>(endpoint: string, data: any): Promise<T> {
        const response = await fetch(`${this.baseUrl}/${endpoint}`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`HTTP POST error! status: ${response.status}`);
        }
        return await response.json();
    }

    async put<T>(endpoint: string, data: any): Promise<T> {
        const response = await fetch(`${this.baseUrl}/${endpoint}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`HTTP PUT error! status: ${response.status}`);
        }
        return await response.json();
    }

    async delete<T>(endpoint: string): Promise<T> {
        const response = await fetch(`${this.baseUrl}/${endpoint}`, {
            method: 'DELETE',
            headers: this.getHeaders()
        });
        if (!response.ok) {
            throw new Error(`HTTP DELETE error! status: ${response.status}`);
        }
        return await response.json();
    }
}
