import { Component } from '@angular/core';

import { AnalogWelcomeComponent } from './analog-welcome.component';

@Component({
  selector: 'at-home-remote-home',
  standalone: true,
  imports: [AnalogWelcomeComponent],
  template: `
     <at-home-remote-analog-welcome/>
  `,
})
export default class HomeComponent {
}
