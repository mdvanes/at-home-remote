import { Component } from '@angular/core';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { RouterOutlet } from '@angular/router';
import { TopNavComponent } from '../components/top-nav/top-nav.component';
import { FooterComponent } from '@at-home-remote/components';

@Component({
  standalone: true,
  imports: [DashboardComponent, RouterOutlet, TopNavComponent, FooterComponent],
  template: `
  <div class="container">
    <header>
      <top-nav />
    </header>
    <main>
      <dashboard />
    </main>
    <lib-footer />
  </div>`,
})
export default class DashboardPageComponent {}
