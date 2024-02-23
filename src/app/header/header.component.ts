import { Component } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../users/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  user: User[] = [];

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    const userId = 1;

    this.userService.getUser(userId)
      .then(user => {
        this.user = [user];
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }


}
