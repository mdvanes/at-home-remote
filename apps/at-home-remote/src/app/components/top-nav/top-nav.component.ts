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
      @use '@angular/material' as mat;

      :host {
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
          'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
          'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
          'Noto Color Emoji';

        // nav bar background: rgba(129,0,130,1)
        --mat-toolbar-container-text-color: #ffabf3; // #{mat.get-theme-color($theme, tertiary, 50)};

        --mdc-filled-button-container-color: #b117af; // rgba(143, 26, 142, 1);
        --mdc-filled-button-label-text-color: #ffabf3;
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
      <button mat-button><mat-icon>home</mat-icon> At Home Remote</button>

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
      } @if (activePath === 'study') {
      <a href="/study"><button mat-flat-button>Study</button></a>
      } @else {
      <a href="/study"><button mat-button>Study</button></a>
      } @if (activePath === 'dashboard') {
      <a href="/dashboard"><button mat-flat-button>Dashboard</button></a>
      } @else {
      <a href="/dashboard"><button mat-button>Dashboard</button></a>
      }

      <a href="/dashboard2"><button mat-button>Dashboard2</button></a>
      <span class="example-spacer" style="flex: 1 1 auto;"></span>

      <a href="https://mdworld.nl" target="_blank">
        <button
          mat-icon-button
          class="example-icon favorite-icon"
          aria-label="Example icon-button with heart icon"
          title="mdworld.nl"
        >
          <mat-icon>open_in_new</mat-icon>
        </button>
      </a>
      <a href="https://github.com/mdvanes/at-home-remote" target="_blank">
        <button
          mat-icon-button
          class="example-icon"
          aria-label="Example icon-button with share icon"
          title="GitHub"
        >
          <mat-icon>star</mat-icon>
        </button>
      </a>
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
