import { Component } from "@angular/core";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { AnalogWelcomeComponent } from "./analog-welcome.component";
import { MytestComponent } from "./mytest.component";

@Component({
  selector: "at-home-remote-home",
  standalone: true,
  imports: [AnalogWelcomeComponent, MatSlideToggleModule, MytestComponent],
  template: `
    <mytest ngSkipHydration />
    <at-home-remote-analog-welcome />
  `,
})
export default class HomeComponent {}
