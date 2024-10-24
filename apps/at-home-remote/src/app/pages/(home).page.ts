import { Component } from '@angular/core';
import { MytestComponent } from '../components/mytest.component';
import { TopNavComponent } from '../components/top-nav/top-nav.component';
import { ComponentsComponent } from '@at-home-remote/components';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NavigationComponent } from "../components/navigation/navigation.component";

@Component({
  selector: 'at-home-remote-home',
  standalone: true,
  imports: [
    MytestComponent,
    ComponentsComponent,
    MatToolbarModule,
    MatIconModule,
    TopNavComponent,
    NavigationComponent
],
  styleUrl: './home.scss',
  template: `<div class="container">
    <header>
      <!-- <navigation /> -->
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
