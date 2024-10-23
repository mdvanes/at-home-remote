import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'top-nav',
  standalone: true,
  imports: [MatButtonModule, MatToolbarModule, MatIconModule],
  styles: [
    `
      :host {
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
          'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
          'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
          'Noto Color Emoji';
        // display: flex;
        // padding: 2rem 1rem 8rem;
        // flex-direction: column;
        // background: rgb(250 250 250);
        // height: 100%;
      }
    `,
  ],
  template: `
    <mat-toolbar>
      <!-- <button
        mat-icon-buttonf
        class="example-icon"
        aria-label="Example icon-button with menu icon"
      ></button> -->
      <button mat-button><mat-icon>menu</mat-icon> At Home Remote</button>
      <a href="/"><button mat-button>Home</button></a>
      <a href="/welcome"><button mat-button>Welcome</button></a>
      <a href="/study"><button mat-flat-button>Study</button></a>
      <a href="/dashboard"><button mat-button>Dashboard</button></a>
      <a href="/dashboard2"><button mat-button>Dashboard2</button></a>
      <span class="example-spacer" style="flex: 1 1 auto;"></span>
      <button
        mat-icon-button
        class="example-icon favorite-icon"
        aria-label="Example icon-button with heart icon"
      >
        <mat-icon>favorite</mat-icon>
      </button>
      <button
        mat-icon-button
        class="example-icon"
        aria-label="Example icon-button with share icon"
      >
        <mat-icon>share</mat-icon>
      </button>
    </mat-toolbar>
  `,
})
export class TopNavComponent {}
