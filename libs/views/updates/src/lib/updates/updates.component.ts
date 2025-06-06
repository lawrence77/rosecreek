import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@rosecreek/ui';

@Component({
  selector: 'lib-updates',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './updates.component.html',
  styleUrl: './updates.component.css',
})
export class UpdatesComponent {}
