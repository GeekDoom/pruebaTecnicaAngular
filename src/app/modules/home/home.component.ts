import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
      CommonModule,
      RouterOutlet,
      RouterLink,
      HttpClientModule
  ],
  templateUrl: './home.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
    isList!: number;
    isMenu: boolean = false;
    isSearch: boolean = false;
    constructor(
        private router: Router,
        private as: AuthService,
    ) { }

    logout() {
    this.as.logout();
    this.router.navigate(['./login']);
  }
     
 }
