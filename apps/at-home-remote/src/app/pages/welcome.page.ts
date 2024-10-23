import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  template: `<div class="container">
    <header>
      <a href="/study">Study</a>
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>
    <footer>footer</footer>
  </div> `,
})
export default class WelcomeLayoutComponent {}
