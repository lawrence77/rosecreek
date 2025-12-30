import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@rosecreek/ui';

@Component({
  selector: 'lib-updates',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './updates.component.html',
  styleUrl: './updates.component.css',
})
export class UpdatesComponent implements OnInit {
  currentInstagramIndex = 0;
  currentFeedbackIndex = 0;

  instagramPosts = [
    {
      img: 'https://via.placeholder.com/300x300?text=Instagram+Post+1',
      caption: 'Our latest golden pup!',
    },
    {
      img: 'https://via.placeholder.com/300x300?text=Instagram+Post+2',
      caption: 'Happy birthday to our newest member!',
    },
    {
      img: 'https://via.placeholder.com/300x300?text=Instagram+Post+3',
      caption: 'Training session in progress.',
    },
  ];

  customerFeedback = [
    {
      photo: 'https://via.placeholder.com/80x80?text=Customer+1',
      text: 'The puppies are absolutely adorable and healthy!',
      author: 'Sarah J.',
    },
    {
      photo: 'https://via.placeholder.com/80x80?text=Customer+2',
      text: 'Great service and very knowledgeable staff.',
      author: 'Michael T.',
    },
  ];

  ngOnInit(): void {
    // Basic carousel auto-advance
    setInterval(() => {
      this.nextInstagram();
      this.nextFeedback();
    }, 5000); // Change every 5 seconds
  }

  nextInstagram(): void {
    this.currentInstagramIndex =
      (this.currentInstagramIndex + 1) % this.instagramPosts.length;
  }

  prevInstagram(): void {
    this.currentInstagramIndex =
      (this.currentInstagramIndex - 1 + this.instagramPosts.length) %
      this.instagramPosts.length;
  }

  nextFeedback(): void {
    this.currentFeedbackIndex =
      (this.currentFeedbackIndex + 1) % this.customerFeedback.length;
  }

  prevFeedback(): void {
    this.currentFeedbackIndex =
      (this.currentFeedbackIndex - 1 + this.customerFeedback.length) %
      this.customerFeedback.length;
  }
}
