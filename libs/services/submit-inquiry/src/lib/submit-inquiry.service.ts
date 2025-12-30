import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubmitInquiryService {
  // IMPORTANT: Replace with your actual NestJS backend URL when deployed
  private baseUrl = 'http://localhost:3000'; // Default NestJS port

  constructor(private http: HttpClient) {}

  // --- Inquiries API ---
  // TODO: WON'T WORK UNTIL BACKEND IS SET UP
  submitInquiry(questionnaire: unknown): Observable<unknown> {
    return this.http.post(`${this.baseUrl}/inquiries`, questionnaire);
  }

  // --- File Upload API (Placeholder) ---
  uploadFile(file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    // This endpoint will be handled by your NestJS backend which then uploads to GCS
    return this.http.post<{ url: string }>(
      `${this.baseUrl}/files/upload`,
      formData
    );
  }
}
