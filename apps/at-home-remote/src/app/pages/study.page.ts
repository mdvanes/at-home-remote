import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopNavComponent } from '../components/top-nav/top-nav.component';
import { FooterComponent } from '@at-home-remote/components';

@Component({
  standalone: true,
  imports: [RouterOutlet, TopNavComponent, FooterComponent],
  template: `<div class="container">
    <header>
      <top-nav />
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>
    <lib-footer />
  </div> `,
})
export default class StudyLayoutComponent {}
