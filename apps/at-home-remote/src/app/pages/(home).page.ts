import { Component } from '@angular/core';
import { MytestComponent } from '../components/mytest.component';
import { TopNavComponent } from '../components/top-nav/top-nav.component';
import { ComponentsComponent } from '@at-home-remote/components';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'at-home-remote-home',
  standalone: true,
  imports: [
    MytestComponent,
    ComponentsComponent,
    MatToolbarModule,
    MatIconModule,
    TopNavComponent,
  ],
  styleUrl: './home.scss',
  template: `<div class="container">
    <header>
      <top-nav />
    </header>
    <main>
      <lib-components></lib-components>
      <mytest ngSkipHydration />
    </main>
    <footer>footer</footer>
  </div>`,
})
export default class HomeComponent {}
