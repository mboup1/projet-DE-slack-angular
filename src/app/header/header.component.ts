import { Component } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../users/service/user.service';
import { ChannelService } from '../channels/service/channel.service';
import { Channel } from '../interfaces/channel';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  user!: User;
  channels: Channel[] = [];
  users: User[] = [];
  // users: User[] = [];




  constructor(
    private userService: UserService,
    private channelService: ChannelService,
    public authService: AuthService,

  ) { }

  ngOnInit(): void {
    // const userId = 1;

    // this.userService.getUserById(userId)
    //   .subscribe(
    //     user => {
    //       this.user = user;
    //     },
    //     error => {
    //       console.error('Error fetching user data:', error);
    //     }
    //   );

    this.channelService.fetchDataByChannels().subscribe(() => {
      this.channels = this.channelService.getChannels();

      this.channels.sort((a, b) => (b.id < a.id) ? 1 : -1);

      // console.log("this.channels : ", this.channels)
      // console.log("this.user : ", this.user)
    });


    this.authService.fetchDataUsers().subscribe(() => {
      this.users = this.authService.getUsers();


      console.log("users header2 : ", this.users)

      // Afficher tous les noms d'utilisateur dans la console
      // const usernames = this.users.map(user => user.username);
      // console.log("users header2 usernames: ", usernames);
    });





    // this.userService.getAllUsers().subscribe((users) => {
    //   console.log("users header : ", users)
    // });
  }

  onLogout() {
    this.authService.logout();
  }
}
