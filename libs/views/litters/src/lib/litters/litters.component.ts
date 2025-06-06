import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@rosecreek/ui';

@Component({
  selector: 'lib-litters',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './litters.component.html',
  styleUrl: './litters.component.css',
})
export class LittersComponent {}
