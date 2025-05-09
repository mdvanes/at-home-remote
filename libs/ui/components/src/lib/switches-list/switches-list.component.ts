import { Component, OnInit } from '@angular/core';
import { State, StateWithWritable } from './smart-entities.types';
import { MatListModule } from '@angular/material/list';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatIconButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { SmartEntitiesService } from './smart-entities.service';

export const isSwitch = (s: State) =>
  typeof s?.attributes?.device_class === 'undefined';

@Component({
  selector: 'lib-switches-list',
  styleUrl: './switches-list.component.scss',
  standalone: true,
  imports: [
    MatListModule,
    FormsModule,
    MatSlideToggleModule,
    MatProgressBar,
    MatIconModule,
    MatIconButton,
  ],
  template: `<h2>
      Light Switches
      <button
        mat-icon-button
        aria-label="Reload button"
        title="Reload switches"
        (click)="getSmartEntities()"
      >
        <mat-icon>refresh</mat-icon>
      </button>
    </h2>
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
          (change)="toggleChange($event, switch.entity_id)"
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
export class SwitchesListComponent implements OnInit {
  switches: StateWithWritable[] = [];
  disabled: boolean[] = [];
  states: boolean[] = [];
  isLoading = true;
  isError = false;

  constructor(private smartEntitiesService: SmartEntitiesService) {}

  ngOnInit() {
    this.getSmartEntities();
  }

  getSmartEntities() {
    this.smartEntitiesService.getSmartEntities().subscribe((data) => {
      const smartEntities = data;
      this.switches = smartEntities.filter(isSwitch);
      this.disabled = this.switches.map((s) => s.writable === false);
      this.states = this.switches.map((s) => s.state === 'on');
      if (this.isLoading) {
        this.isLoading = false;
      }
    });
  }

  toggleChange(evt: MatSlideToggleChange, id: string | undefined) {
    if (!id) {
      return;
    }

    this.smartEntitiesService
      .setSmartEntityState(id, evt.checked ? 'on' : 'off')
      .subscribe(() => {
        this.getSmartEntities();
      });
  }

  getSmartEntitiesEvents() {
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
