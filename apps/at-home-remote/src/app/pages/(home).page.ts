import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  FooterComponent,
  HomesecStateComponent,
  SwitchesListComponent,
} from '@at-home-remote/components';
import { TopNavComponent } from '../components/top-nav/top-nav.component';

const INNER_WIDTH = 500;

@Component({
  selector: 'at-home-remote-home',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    TopNavComponent,
    SwitchesListComponent,
    FooterComponent,
    MatCardModule,
    MatGridListModule,
    HomesecStateComponent,
  ],
  styleUrl: './home.scss',
  template: `<div class="container">
    <header>
      <top-nav />
    </header>
    <main>
      <mat-grid-list
        [cols]="mainCols"
        (window:resize)="onResize($event)"
        gutterSize="2rem"
        rowHeight="1:2"
      >
        <mat-grid-tile>
          <mat-card appearance="outlined" class="card">
            <mat-card-content>
              <lib-switches-list />
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>
        <mat-grid-tile>
          <mat-card appearance="outlined" class="card">
            <mat-card-content>
              <lib-homesec-slider />
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>
      </mat-grid-list>
    </main>
    <lib-footer />
  </div>`,
})
export default class HomeComponent {
  mainCols = 2;

  ngOnInit() {
    this.mainCols = window.innerWidth <= INNER_WIDTH ? 1 : 2;
  }

  onResize(event: Event) {
    this.mainCols = (event.target as Window)?.innerWidth <= INNER_WIDTH ? 1 : 2;
  }
}
