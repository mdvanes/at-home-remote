import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopNavComponent } from '../components/top-nav/top-nav.component';

@Component({
  standalone: true,
  imports: [RouterOutlet, TopNavComponent],
  template: `<div class="container">
    <header>
      <top-nav />
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>
    <footer>footer</footer>
  </div> `,
})
export default class WelcomeLayoutComponent {}
