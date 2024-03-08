import { Component, HostListener } from '@angular/core';
import { Channel } from '../interfaces/channel';
import { ChannelService } from '../channels/service/channel.service';
import { AuthService } from '../auth.service';
import { User } from '../interfaces/user';
import { UserService } from '../users/service/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  channels: Channel[] = [];
  channelIdToUsers!: number;
  uniqueUsers: Set<string> = new Set();


  users: User[] = [];


  constructor(
    private channelService: ChannelService,
    public userService: UserService,
    public authService: AuthService,


  ) { }

  ngOnInit(): void {

    this.channelService.fetchDataByChannels().subscribe(() => {
      this.channels = this.channelService.getChannels();

      // console.log("this.channels : ", this.channels)
    });

    this.channelService.getChannelId().subscribe(channelId => {

      console.log("channelId dans SidebarComponent : ", channelId);
      this.channelIdToUsers = channelId


    });

  }

  // Cette méthode renvoie les utilisateurs sans doublons
  getUsersToChannel(): string[] {
    const userSet = new Set<string>();
    this.channels
      //Pour récupérer l 'id du canal actif
      .filter(channel => channel.id === this.channelIdToUsers)
      .forEach(channel => {
        channel.posts.forEach(post => {
          if (post.user) {
            userSet.add(post.user.username);
          }
        });
      });
    return Array.from(userSet);
  }

}
