import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dog } from '@rosecreek/models/dog'; // Adjust the import path as necessary

@Injectable({
  providedIn: 'root',
})
export class DogService {
  // IMPORTANT: Replace with your actual NestJS backend URL when deployed
  // private baseUrl = 'http://localhost:3000'; // Default NestJS port
  mockData = [
    {
      id: 1,
      name: 'Caymus',
      birthDate: new Date(Date.UTC(2025, 0, 17, 12)),
      gender: 'Male',
      breed: 'Golden Retriever',
    },
  ] satisfies Dog[];

  // constructor(private http: HttpClient) {}

  // --- Dogs API ---
  getDogs(): Observable<Dog[]> {
    // return this.http.get<Dog[]>(`${this.baseUrl}/dogs`);
    return new Observable<Dog[]>((observer) => {
      observer.next(this.mockData);
      observer.complete();
    });
  }

  // getDog(id: string): Observable<Dog> {
  //   // return this.http.get<Dog>(`${this.baseUrl}/dogs/${id}`);
  // }

  // createDog(dog: Dog): Observable<Dog> {
  //   // return this.http.post<Dog>(`${this.baseUrl}/dogs`, dog);
  // }

  // updateDog(id: string, dog: Dog): Observable<Dog> {
  //   // return this.http.put<Dog>(`${this.baseUrl}/dogs/${id}`, dog);
  // }

  // deleteDog(id: string): Observable<void> {
  //   // return this.http.delete<void>(`${this.baseUrl}/dogs/${id}`);
  // }
}
