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


  constructor(
    private userService: UserService,
    private channelService: ChannelService,
    public authService: AuthService,

  ) { }

  ngOnInit(): void {
    const userId = 1;

    this.userService.getUserById(userId)
      .subscribe(
        user => {
          this.user = user;
        },
        error => {
          console.error('Error fetching user data:', error);
        }
    );

    this.channelService.fetchData().subscribe(() => {
      this.channels = this.channelService.getChannels();

      this.channels.sort((a, b) => (b.id < a.id) ? 1 : -1);

      // console.log("this.channels : ", this.channels)
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
