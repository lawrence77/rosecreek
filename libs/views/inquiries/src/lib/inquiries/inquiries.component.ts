import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@rosecreek/ui';

@Component({
  selector: 'lib-inquiries',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './inquiries.component.html',
  styleUrl: './inquiries.component.css',
})
export class InquiriesComponent {}
