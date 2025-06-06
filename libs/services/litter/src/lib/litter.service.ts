import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Litter } from '@rosecreek/litter-model';

@Injectable({
  providedIn: 'root',
})
export class LitterService {
  // IMPORTANT: Replace with your actual NestJS backend URL when deployed
  // private baseUrl = 'http://localhost:3000'; // Default NestJS port
  mockData = [
    {
      id: 1,
      damId: 2,
      sireId: 3,
      birthDate: new Date(Date.UTC(2025, 0, 17, 12)),
      puppyIds: [1],
      photos: [],
    },
  ] satisfies Litter[];

  // constructor(private http: HttpClient) {}

  // --- Litter API ---
  getLitters(): Observable<Litter[]> {
    return new Observable<Litter[]>((observer) => {
      observer.next(this.mockData);
      observer.complete();
    });
  }
}
