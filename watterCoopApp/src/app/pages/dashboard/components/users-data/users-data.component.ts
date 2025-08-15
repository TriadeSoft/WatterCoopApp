import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-users-data',
  imports: [],
  templateUrl: './users-data.component.html',
  styleUrl: './users-data.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersDataComponent { }
