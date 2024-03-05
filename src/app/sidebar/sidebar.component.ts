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
  users: User[] = [];


  constructor(
    private channelService: ChannelService,
    public userService: UserService,

  ) { }

  ngOnInit(): void {


    this.channelService.fetchDataByChannels().subscribe(() => {
      this.channels = this.channelService.getChannels();

      this.channels.sort((a, b) => (b.id < a.id) ? 1 : -1);

      // console.log("this.channels : ", this.channels)
    });


  }



}
