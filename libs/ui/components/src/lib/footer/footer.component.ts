import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'lib-footer',
  styleUrl: './footer.component.scss',
  standalone: true,
  imports: [MatListModule, FormsModule, MatSlideToggleModule, DatePipe],
  template: `<footer>
    <div>mdworld.nl | CC {{ now | date : 'yyyy' }}</div>
  </footer>`,
})
export class FooterComponent {
  now = new Date();
}
