import { Component } from '@angular/core';
import { MytestComponent } from '../components/mytest.component';
import { TopNavComponent } from '../components/top-nav/top-nav.component';
import {
  ComponentsComponent,
  SwitchesListComponent,
  FooterComponent,
  HomesecSliderComponent,
} from '@at-home-remote/components';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { NavigationComponent } from '../components/navigation/navigation.component';

@Component({
  selector: 'at-home-remote-home',
  standalone: true,
  imports: [
    MytestComponent,
    ComponentsComponent,
    MatToolbarModule,
    MatIconModule,
    TopNavComponent,
    NavigationComponent,
    SwitchesListComponent,
    FooterComponent,
    MatCardModule,
    MatGridListModule,
    HomesecSliderComponent,
  ],
  styleUrl: './home.scss',
  template: `<div class="container">
    <header>
      <!-- <navigation /> -->
      <top-nav />
    </header>
    <main>
      <mat-grid-list cols="2">
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
export default class HomeComponent {}
