import { Component } from '@angular/core';
import { State, StateWithWritable } from './smart-entities.types';
import { SmartEntitiesService } from './smart-entities.service';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

export const isSwitch = (s: State) =>
  typeof s?.attributes?.device_class === 'undefined';

@Component({
  selector: 'lib-switches-list',
  styleUrl: './switches-list.component.scss',
  standalone: true,
  imports: [MatListModule, FormsModule, MatSlideToggleModule],
  template: `
    <h2>Light Switches</h2>
    <mat-list>
    @for (switch of switches; track switch.entity_id) {
    <mat-list-item class="switches-list-item">
      <mat-slide-toggle
        [(ngModel)]="states[$index]"
        [disabled]="disabled[$index]"
        labelPosition="before"
        class="switches-list-item1"
      >
        <span class="switches-list-item2">
          {{ switch.attributes?.friendly_name }}</span
        ></mat-slide-toggle
      >
    </mat-list-item>
    }
  </mat-list>`,
})
export class SwitchesListComponent {
  switches: StateWithWritable[] = [];
  disabled: boolean[] = [];
  states: boolean[] = [];

  constructor(private smartEntitiesService: SmartEntitiesService) {}

  ngOnInit() {
    this.getSwitches();
  }

  getSwitches() {
    this.smartEntitiesService.getSmartEntities().subscribe((data) => {
      // console.log('getSwitches', data);
      this.switches = data.filter(isSwitch);
      this.disabled = this.switches.map((s) => s.writable === false);
      this.states = this.switches.map((s) => s.state === 'on');
    });
    // this.switches = this.smartEntitiesService.getAll();
  }
}
