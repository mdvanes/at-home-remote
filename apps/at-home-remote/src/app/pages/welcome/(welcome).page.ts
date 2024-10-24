import { Component } from '@angular/core';
import { AnalogWelcomeComponent } from '../../components/analog-welcome.component';
import { TopNavComponent } from '../../components/top-nav/top-nav.component';

@Component({
  standalone: true,
  imports: [AnalogWelcomeComponent, TopNavComponent],
  template: ` <header>
      <top-nav />
    </header>
    <main>
      <h2>Welcome Route</h2>
      <at-home-remote-analog-welcome />
    </main>`,
})
export default class WelcomeRouteComponent {}
