import { Component } from '@angular/core';
import { MytestComponent } from "./mytest.component";
import { AnalogWelcomeComponent } from './analog-welcome.component';

@Component({
  selector: 'at-home-remote-home',
  standalone: true,
  imports: [AnalogWelcomeComponent, MytestComponent],
  template: `
     <mytest ngSkipHydration />
     <at-home-remote-analog-welcome/>
  `,
})
export default class HomeComponent {
}
