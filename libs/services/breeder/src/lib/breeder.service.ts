import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Breeder, Member } from '@rosecreek/breeder-model';

@Injectable({
  providedIn: 'root',
})
export class BreederService {
  staff = [
    { id: 1, name: 'Sharon Wilson', role: 'Owner', bio: 'Founder and owner' },
    { id: 2, name: 'Lauryn Wilson', role: 'Staff', bio: "I'm Lauryn" },
  ] satisfies Member[];
  handlers = [
    {
      id: 3,
      name: 'Maddie McCoy',
      role: 'Dog Handler',
      bio: 'Professional dog handler',
    },
  ] satisfies Member[];
  mockData: Breeder[] = [
    {
      id: 1,
      name: 'Rose Creek',
      staff: this.staff,
      handlers: this.handlers,
      sponsors: [],
      support: [],
      description:
        'Rose Creek is a family-owned breeder of Golden Retrievers, dedicated to producing healthy, happy puppies with excellent temperaments.',
      history:
        'Founded in 2010, Rose Creek has been a trusted name in Golden Retriever breeding for over a decade. Our family has a long history of working with dogs, and we are committed to maintaining the highest standards in breeding practices.',
      mission:
        'Our mission is to breed Golden Retrievers that excel in health, temperament, and companionship. We strive to provide families with loving and loyal pets that will be part of their lives for many years.',
      photos: [],
      litters: [1], // Example litter IDs
    },
  ] satisfies Breeder[];

  getBreeders(): Observable<Breeder[]> {
    return new Observable<Breeder[]>((observer) => {
      observer.next(this.mockData);
      observer.complete();
    });
  }

  getBreeder(id: number): Observable<Breeder | undefined> {
    return of(this.mockData.find((breeder) => breeder.id === id));
  }
}
