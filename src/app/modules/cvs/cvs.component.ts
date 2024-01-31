import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'app-cvs',
  standalone: true,
  imports: [
      CommonModule,

  ],
  templateUrl: './cvs.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvsComponent {
 }
