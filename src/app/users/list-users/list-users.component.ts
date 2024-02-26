import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { Subscription } from 'rxjs';
import { UserService } from '../service/user.service';
import { UserStoreService } from '../service/user-store.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent implements OnInit, OnDestroy{

 headers: string[] = ['id', 'name', 'email', 'idChannel'];
  usersList: User[] = [];
  private userSubscription!: Subscription;

  constructor(private userService: UserService, private userStoreService: UserStoreService) {
  }

  ngOnInit() {

    this.userSubscription = this.userService.getAllUsers().subscribe({
      next: (users: User[]) => {
        this.userStoreService.users = users;
      }      
    })
    this.userStoreService.users$.subscribe(users =>  this.usersList = users);
    
  }
  ngOnDestroy() {
    console.log('Destruction du composant userList')
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
  delete(id: number) {
    this.userService.deleteUser(id).subscribe(v => {
      this.userStoreService.deleteCLientById(id);
    })
  }

}

