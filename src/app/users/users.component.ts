import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FindUser } from '../models/find_user';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  selectedDeleteUserId: number;

  constructor(private _router: Router, private _userSvc: UserService) { 
    this.users = [];
    this.selectedDeleteUserId = 0;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.users = this._userSvc.find(new FindUser());
  }

  goToAddUserPage() {
    this._router.navigate(['/users/add']);
  }

  goToEditPage(userId: number) {
    this._router.navigate([`/users/edit/${userId}`]);
  }
  
  removeUser() {
    if (this.selectedDeleteUserId == 0) {
      return;
    }
    let resId = this._userSvc.remove(this.selectedDeleteUserId);
    if (resId != 0) {
      this.loadData();
    }
  }

  setSelectedUserId(userId: number) {
    console.log('setSelectedUserId', userId);
    this.selectedDeleteUserId = userId;
  }
}
