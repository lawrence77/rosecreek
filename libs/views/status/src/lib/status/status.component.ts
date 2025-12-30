import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@rosecreek/ui';

@Component({
  selector: 'lib-status',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './status.component.html',
  styleUrl: './status.component.css',
})
export class StatusComponent {}
