import { Component, HostListener } from '@angular/core';
import { Channel } from '../interfaces/channel';
import { ChannelService } from '../channels/service/channel.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  channels: Channel[] = [];
  isMobile: boolean = window.innerWidth < 992;


  constructor(
    private channelService: ChannelService,
  ) { }

  ngOnInit(): void {
    this.channelService.fetchData().subscribe(() => {
      this.channels = this.channelService.getChannels();

      this.channels.sort((a, b) => (b.id < a.id) ? 1 : -1);

      // console.log("this.channels : ", this.channels)
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isMobile = window.innerWidth < 992;
  }



}
