import { CommonModule } from '@angular/common';
import { Component /*, OnInit*/ } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { AuthService } from '../../auth/auth.service';
// import { Router } from '@angular/router';

@Component({
  selector: 'lib-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.css'],
})
export class HeaderComponent /*implements OnInit*/ {
  isLoggedIn = false;

  // constructor(private authService: AuthService, private router: Router) {}

  // ngOnInit(): void {
  //   // Subscribe to auth state changes to update login status
  //   this.authService.isLoggedIn$.subscribe((loggedIn) => {
  //     this.isLoggedIn = loggedIn;
  //   });
  // }

  // logout(): void {
  //   this.authService.logout();
  //   this.router.navigate(['/login']);
  // }
}
