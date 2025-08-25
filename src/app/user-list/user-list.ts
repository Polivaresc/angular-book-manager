import { Component } from '@angular/core';
import { User } from '../../user';
import { UserService } from '../user-service';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserList {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(data => this.users = data);
  }
}
