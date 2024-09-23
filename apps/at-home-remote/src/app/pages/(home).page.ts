import { Component } from '@angular/core';
import { MytestComponent } from './mytest.component';
import { AnalogWelcomeComponent } from './analog-welcome.component';
import { ComponentsComponent } from '@at-home-remote/components';

@Component({
  selector: 'at-home-remote-home',
  standalone: true,
  imports: [AnalogWelcomeComponent, MytestComponent, ComponentsComponent],
  template: `
    <lib-components></lib-components>
    <mytest ngSkipHydration />
    <at-home-remote-analog-welcome />
  `,
})
export default class HomeComponent {}
