import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
_users:BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
users$: Observable<User[]> = this._users.asObservable();

 get users(): User[] {
   return this._users.getValue();
 }

 set users(val: User[]){
   this._users.next(val)
 }

 addUser(newUser: User){
   this.users = ([...this.users, newUser]);
 }
 deleteCLientById(id: number){
   this.users = this.users.filter(user => user.id !== id );
 }
 /*
 updateClient(updatedUser: User) {
   const currentUsers = [...this.users];
   const index = currentUsers.findIndex(client => client.id === updatedUser.id);
   currentUsers[index] = updatedUser;
   this.users = (currentUsers);
 }
 */

  constructor() { }
}


