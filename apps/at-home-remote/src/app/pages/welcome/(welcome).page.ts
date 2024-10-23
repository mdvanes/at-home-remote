import { Component } from '@angular/core';
import { AnalogWelcomeComponent } from '../../components/analog-welcome.component';

@Component({
  standalone: true,
  imports: [AnalogWelcomeComponent],
  template: `<h2>Welcome Route</h2>
    <at-home-remote-analog-welcome />`,
})
export default class WelcomeRouteComponent {}
