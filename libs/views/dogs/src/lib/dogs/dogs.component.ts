import { Component, OnInit } from '@angular/core';
import { Dog } from '@rosecreek/dog-model';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@rosecreek/ui';
import { DogService } from '@rosecreek/dog-service';

@Component({
  selector: 'lib-dogs',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './dogs.component.html',
  styleUrl: './dogs.component.css',
})
export class DogsComponent implements OnInit {
  dogs: Dog[] = [];

  constructor(private dogService: DogService) {}

  ngOnInit(): void {
    this.loadDogs();
  }

  loadDogs(): void {
    // Simulate an API call to fetch dogs
    this.dogService.getDogs().subscribe({
      next: (data: Dog[]) => {
        this.dogs = data;
      },
      error: (error: unknown) => {
        console.error('Error fetching dogs:', error);
      },
      complete: () => {
        console.log('Dogs loaded successfully');
      },
    });
  }
}
