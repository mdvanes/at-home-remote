import { Component } from '@angular/core';
import { State, StateWithWritable } from './smart-entities.types';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBar } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { SmartEntitiesService } from './smart-entities.service';

export const isSwitch = (s: State) =>
  typeof s?.attributes?.device_class === 'undefined';

@Component({
  selector: 'lib-switches-list',
  styleUrl: './switches-list.component.scss',
  standalone: true,
  imports: [MatListModule, FormsModule, MatSlideToggleModule, MatProgressBar],
  template: `<h2>Light Switches</h2>
    @if (isError) {
    <span>Error</span>
    } @else if (isLoading) {
    <mat-progress-bar mode="buffer"></mat-progress-bar>
    } @else {
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
    </mat-list>
    } `,
})
export class SwitchesListComponent {
  switches: StateWithWritable[] = [];
  disabled: boolean[] = [];
  states: boolean[] = [];
  isLoading = true;
  isError = false;

  constructor(private smartEntitiesService: SmartEntitiesService) {}

  ngOnInit() {
    this.smartEntitiesService.getSmartEntitiesEvents().subscribe((data) => {
      if (data.data === '"Error"') {
        console.error('Error fetching smart entities');
        this.isError = true;
        return;
      }
      this.isError = false;
      const smartEntities = JSON.parse(data.data);
      // console.log(data.error);
      this.switches = smartEntities.filter(isSwitch);
      this.disabled = this.switches.map((s) => s.writable === false);
      this.states = this.switches.map((s) => s.state === 'on');
      if (this.isLoading) {
        this.isLoading = false;
      }
    });
  }
}
