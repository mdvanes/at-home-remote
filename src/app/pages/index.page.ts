import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatSlideToggleModule,
  ],
  template: `
    <!-- <div>
      <a href="https://analogjs.org/" target="_blank">
        <img alt="Analog Logo" class="logo analog" src="/analog.svg" />
      </a>
    </div> -->

    <h2>Analog</h2>

    <mat-slide-toggle>Toggle me!</mat-slide-toggle>
    <button mat-button>Basiccc</button>

    <h3>The fullstack meta-framework for Angular!</h3>

    <div class="card">
      <button type="button" (click)="increment()">Count {{ count }}</button>
    </div>

    <p class="read-the-docs">
      For guides on how to customize this project, visit the
      <a href="https://analogjs.org" target="_blank">Analog documentation</a>
    </p>
  `,
  styles: [
    `
      // .logo {
      //   will-change: filter;
      // }
      // .logo:hover {
      //   filter: drop-shadow(0 0 2em #646cffaa);
      // }
      // .read-the-docs {
      //   color: #888;
      // }
    `,
  ],
})

export default class HomeComponent {
  count = 0;

  increment() {
    this.count++;
  }
}
