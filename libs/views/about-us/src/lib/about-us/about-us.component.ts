import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@rosecreek/ui';
import { BreederService } from '@rosecreek/breeder-service';
import { Breeder } from '@rosecreek/breeder-model';

@Component({
  selector: 'lib-about-us',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
})
export class AboutUsComponent implements OnInit {
  aboutUs?: Breeder;

  constructor(private breederService: BreederService) {}

  ngOnInit(): void {
    this.loadAboutUs();
  }

  loadAboutUs(): void {
    // Assuming 1 is the ID for Rose Creek
    this.breederService.getBreeder(1).subscribe({
      next: (data) => {
        this.aboutUs = data;
      },
      error: (error) => {
        console.error('Error fetching breeder information:', error);
      },
      complete: () => {
        console.log('Breeder information loaded successfully');
      },
    });
  }
}
