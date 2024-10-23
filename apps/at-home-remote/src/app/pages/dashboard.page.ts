import { Component } from '@angular/core';
import { DashboardComponent } from '../components/dashboard/dashboard.component';

@Component({
  standalone: true,
  template: ` <dashboard /> `,
  imports: [DashboardComponent],
})
export default class DashboardPageComponent {}
