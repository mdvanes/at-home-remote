import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

// See: https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/projects/documentation/src/app/app.component.html

@Component({
  standalone: true,
  template: `<div class="box mat-app-background" fxLayout="column">
    <header class="app-toolbar mat-elevation-z6" #header>
      <mat-toolbar color="primary">
        <button mat-button class="mat-button marker-home-button">
          <span class="mat-button-wrapper marker-header-logo">
            <img
              width="30"
              height="30"
              src="assets/images/angular_ngx_logo_contrast.png"
            />
            <span>Dashboard</span>
          </span>
          <div class="mat-button-focus-overlay"></div>
          <div class="mat-button-ripple mat-ripple"></div>
        </button>
        <button
          mat-button
          class="mat-button marker-menu-trigger"
          [matMenuTriggerFor]="jsonMenu"
          matTooltip="Select JSON overview or library"
        >
          <span>JSON</span>
          <!-- <fa-icon class="pl-2" [icon]="faCaretDown"></fa-icon> -->
        </button>
        <mat-menu #jsonMenu="matMenu">
          <button mat-menu-item class="marker-json-button">
            <span>JSON Overview</span>
          </button>
          <mat-divider></mat-divider>
          <span mat-menu-item disabled><b>Libraries</b></span>
          <button mat-menu-item class="marker-json-button">
            <span>base-json</span>
          </button>
          <button mat-menu-item class="marker-json-button">
            <span>json</span>
          </button>
          <button mat-menu-item class="marker-json-button">
            <span>json-api</span>
          </button>
        </mat-menu>
        <button mat-button class="mat-button marker-widgets-button">
          <span>widgets</span>
          <div class="mat-button-focus-overlay"></div>
          <div class="mat-button-ripple mat-ripple"></div>
        </button>
        <!-- <button
          mat-button
          class="mat-button marker-json-button"
          [routerLink]="['testing']"
        > -->
        <button mat-button class="mat-button marker-json-button">
          <span>testing</span>
          <div class="mat-button-focus-overlay"></div>
          <div class="mat-button-ripple mat-ripple"></div>
        </button>
        <div fxFlex></div>
        <!-- <ngx-mat-theme-switcher></ngx-mat-theme-switcher> -->
        <!-- <button
          mat-button
          class="mat-button marker-github-button"
          (click)="redirectToGitHub()"
        > -->
        <button mat-button class="mat-button marker-github-button">
          <!-- <fa-icon [icon]="faGitHub" transform="grow-20"></fa-icon> -->
          <span class="pl-3">GitHub</span>
          <div class="mat-button-focus-overlay"></div>
          <div class="mat-button-ripple mat-ripple"></div>
        </button>
      </mat-toolbar>
    </header>
    <div class="box-content">
      <!-- <router-outlet></router-outlet> -->
    </div>
    <footer>
      <mat-toolbar fxLayout="row" fxLayoutGap="10px">
        <span fxFlex></span>
        <span>
          <!-- <markdown
            class="footer-text"
            fxLayout="row"
            fxLayoutAlign.gt-xs="center"
          > -->
          Crafted for **ngx-material-dashboard**
          <span style="margin:0 .15em;">•</span>
          Follow on [GitHub](https://github.com/ngx-material-dashboard)
          <!-- <span
            >&#169; {{ date | date : 'yyyy' }} Jonathan Phillips
            (https://github.com/jphillips03)</span
          > -->
          <!-- </markdown> -->
        </span>
        <span fxFlex></span>
      </mat-toolbar>
    </footer>
  </div>`,
  imports: [MatToolbarModule, MatMenuModule, MatDividerModule],
})
export default class Dashboard2PageComponent {
  date: Date = new Date();
}
