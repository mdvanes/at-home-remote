import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';

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

      @if (!activePath) {
      <a href="/"><button mat-flat-button>Home</button></a>
      } @else {
      <a href="/"><button mat-button>Home</button></a>
      }
      <!-- DOES NOT WORK <a href="/welcome"
        ><button
          [attr.mat-button]="activePath !== 'welcome'"
          [attr.mat-flat-button]="activePath === 'welcome'"
        >
          Welcome
        </button></a
      > -->
      <!-- DOES NOT WORK <a href="/welcome" routerLinkActive="active"
        ><button mat-button routerLinkActive="active">Welcome</button></a
      > -->

      @if (activePath === 'welcome') {
      <a href="/welcome"><button mat-flat-button>Welcome</button></a>
      } @else {
      <a href="/welcome"><button mat-button>Welcome</button></a>
      }

      <a href="/study"><button mat-button>Study</button></a>
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
export class TopNavComponent {
  readonly route = inject(ActivatedRoute);
  readonly activePath = this.route.pathFromRoot[1].snapshot.url[0]?.path;

  // ngOnInit() {
  //   console.log(this.activePath);
  //   // console.log(this.route.pathFromRoot[1].snapshot.url[0].path);
  // }
}
