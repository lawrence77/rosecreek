import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@rosecreek/ui';
import { LitterService } from '@rosecreek/litter-service';
import { Litter } from '@rosecreek/litter-model';

@Component({
  selector: 'lib-litters',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './litters.component.html',
  styleUrl: './litters.component.css',
})
export class LittersComponent implements OnInit {
  litters: Litter[] = [];

  constructor(private litterService: LitterService) {}

  ngOnInit(): void {
    this.loadLitters();
  }

  loadLitters(): void {
    this.litterService.getLitters().subscribe({
      next: (data) => {
        this.litters = data;
      },
      error: (error) => {
        console.error('Error fetching litters:', error);
      },
      complete: () => {
        console.log('Litters loaded successfully');
      },
    });
  }
}
