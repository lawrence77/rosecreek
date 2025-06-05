import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@rosecreek/ui'; // Adjust the import path as necessary

@Component({
  selector: 'lib-dogs',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './dogs.component.html',
  styleUrl: './dogs.component.css',
})
export class DogsComponent {}
