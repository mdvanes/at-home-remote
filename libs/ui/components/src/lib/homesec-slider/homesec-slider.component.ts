import { Component } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatChipsModule } from '@angular/material/chips';
import { HomesecService } from './homesec.service';
import { Modes } from './homesec.types';

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
    <mat-chip-listbox class="mat-mdc-chip-set-stacked">
      @for (opt of homeSecModes; track opt) {
      <mat-chip-option [selected]="selected[$index]">{{ opt }}</mat-chip-option>
      }
    </mat-chip-listbox>`,
})
export class HomesecSliderComponent {
  selected = [false, false, false, false];

  readonly homeSecModes: Modes[] = [
    'Error',
    'Disarm',
    'Home Arm 1',
    'Full Arm',
  ];

  constructor(private homesecService: HomesecService) {}

  ngOnInit() {
    this.getHomesec();
  }

  getHomesec() {
    this.homesecService.getHomesecState().subscribe((data) => {
      this.selected = this.homeSecModes.map((opt) => opt === data.mode);
    });
  }
}
