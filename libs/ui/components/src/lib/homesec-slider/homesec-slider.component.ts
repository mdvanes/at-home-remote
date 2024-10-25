import { Component } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'lib-homesec-slider',
  standalone: true,
  imports: [MatSliderModule, MatChipsModule],
  styles: [
    `
      :host {
        display: inline-block;
        width: 100%;
      }

      mat-slider {
        width: 100%;
      }
    `,
  ],
  template: ` <h2>Home Security</h2>
    <mat-slider
      min="1"
      max="4"
      showTickMarks
      discrete
      [displayWith]="formatLabel"
    >
      <input matSliderThumb [value]="val" />
    </mat-slider>
    <mat-chip>Security Level: {{ val }}</mat-chip>`,
})
export class HomesecSliderComponent {
  val = 2;

  formatLabel(value: number): string {
    return value + ' stars';
  }
}
