import { Component, OnInit } from '@angular/core';
import { Dog } from '@rosecreek/models/dog'; // Adjust the import path as necessary
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@rosecreek/ui'; // Adjust the import path as necessary

@Component({
  selector: 'lib-dogs',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './dogs.component.html',
  styleUrl: './dogs.component.css',
})
export class DogsComponent implements OnInit {
  dogs: Dog[] = [];

  ngOnInit(): void {
    this.loadDogs();
  }

  loadDogs(): void {
    // Simulate an API call to fetch dogs
    this.dogs = [
      {
        id: 1,
        name: 'Caymus',
        birthDate: new Date(Date.UTC(2025, 0, 17, 12)),
        gender: 'Male',
        breed: 'Golden Retriever',
      },
    ] satisfies Dog[];
  }
}
