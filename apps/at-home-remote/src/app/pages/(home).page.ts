import { Component } from '@angular/core';
import { MytestComponent } from './mytest.component';
import { ComponentsComponent } from '@at-home-remote/components';

@Component({
  selector: 'at-home-remote-home',
  standalone: true,
  imports: [MytestComponent, ComponentsComponent],
  styleUrl: './home.scss',
  template: `<div class="container">
    <header>
      <a href="/study">Home</a>
      <a href="/study">Welcome</a>
      <a href="/study">Study</a>
      <a href="/study">Dashboard</a>
      <a href="/study">Dashboard2</a>
    </header>
    <main>
      <lib-components></lib-components>
      <mytest ngSkipHydration />
    </main>
    <footer>footer</footer>
  </div>`,
})
export default class HomeComponent {}
