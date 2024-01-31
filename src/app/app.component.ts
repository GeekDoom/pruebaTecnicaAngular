import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,HomeComponent],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'pruebaTecnicaAngular';
}
