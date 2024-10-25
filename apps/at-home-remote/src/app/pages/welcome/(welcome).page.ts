import { Component } from '@angular/core';
import { AnalogWelcomeComponent } from '../../components/analog-welcome.component';
import { TopNavComponent } from '../../components/top-nav/top-nav.component';
import { MytestComponent } from '../../components/mytest.component';
import { ComponentsComponent } from '@at-home-remote/components';

@Component({
  standalone: true,
  imports: [
    AnalogWelcomeComponent,
    ComponentsComponent,
    MytestComponent,
    TopNavComponent,
  ],
  template: `
    <h2>Welcome Route</h2>
    <lib-components></lib-components>
    <mytest ngSkipHydration />
    <at-home-remote-analog-welcome />
  `,
})
export default class WelcomeRouteComponent {}
