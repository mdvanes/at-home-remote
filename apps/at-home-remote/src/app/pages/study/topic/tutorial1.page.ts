import { Component } from '@angular/core';
import { Tutorial1Component } from '@at-home-remote/study';

@Component({
  standalone: true,
  imports: [Tutorial1Component, ],
  template: `tutorial1 <lib-study-tutorial1 />`,
})
export default class StudyPageComponent {}
