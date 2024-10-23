import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

interface User {
  id: number;
  name: string;
}

@Component({
  selector: 'lib-study-tutorial1',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card appearance="outlined">
      <mat-card-content>
        @if(isLoggedIn) { I am logged in } @else { I am not logged in}
      </mat-card-content>
    </mat-card>

    <mat-card appearance="outlined">
      <mat-card-content>
        @for (user of users; track user.id) {
        <p>{{ user.name }}</p>
        }
      </mat-card-content>
    </mat-card>

    <mat-card appearance="outlined">
      <mat-card-content>
        <div contentEditable="false"></div>
      </mat-card-content>
    </mat-card>

    `,
  //   templateUrl: './study.component.html',
  //   styleUrl: './study.component.css',
})
export class Tutorial1Component {
  isLoggedIn = true;
  users: User[] = [
    { id: 0, name: 'Sarah' },
    { id: 1, name: 'Amy' },
    { id: 2, name: 'Rachel' },
    { id: 3, name: 'Jessica' },
    { id: 4, name: 'Poornima' },
  ];
}
