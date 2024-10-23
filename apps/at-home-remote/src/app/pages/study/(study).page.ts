import { Component } from '@angular/core';
// import { MytestComponent } from './mytest.component';
// import { AnalogWelcomeComponent } from './analog-welcome.component';
// import { ComponentsComponent } from '@at-home-remote/components';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  //   selector: 'studying-page',
  standalone: true,
  imports: [MatListModule, MatMenuModule],
  template: `
    <!-- <mat-menu #menu="matMenu">
      <button mat-menu-item>Item 1</button>
      <button mat-menu-item>Item 2</button>
    </mat-menu> -->
    <mat-list>
      <mat-list-item>
        <div matListItemTitle><a href="/study/topic/tutorial1">tutorial1</a></div>
        <div matListItemLine>1</div>
        <div matListItemIcon>icon</div>
        <div matListItemAvatar>Avatar</div>
      </mat-list-item>
      <mat-list-item>Salt</mat-list-item>
      <mat-list-item>Paprika</mat-list-item>
    </mat-list>
  `,
})
export default class StudyPageComponent {}
