import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'mytest',
  standalone: true,
  imports: [MatSlideToggleModule, MatButtonModule],
  styles: [
    `
      :host {
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
          'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
          'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
          'Noto Color Emoji';
        display: flex;
        padding: 2rem 1rem 8rem;
        flex-direction: column;
        // background: rgb(250 250 250);
        // height: 100%;
      }
    `,
  ],
  template: `
    <main class="main">
      <button mat-flat-button>Basic</button>
      <p><mat-slide-toggle>Slide me!</mat-slide-toggle></p>
      <p>
        <mat-slide-toggle labelPosition="before"
          >...and slide me too!</mat-slide-toggle
        >
      </p>
    </main>
  `,
})
export class MytestComponent {}
