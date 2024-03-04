import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { Channel } from '../../interfaces/channel';
import { ActivatedRoute, Router } from '@angular/router';
import { ChannelService } from '../../channels/service/channel.service';
import axios from 'axios';
import { API_BASE_URL } from '../../config/config';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrl: './list-posts.component.css'
})
export class ListPostsComponent {
  userName: string = '';
  user: User[] = [];

  channel: Channel = {id: 0, name: '', deletable: false, posts: [], idUser: 0};
  constructor(
    private route: ActivatedRoute,
    private channelService: ChannelService,
    public authService: AuthService,

    private router: Router
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const channelId = +params['id'];

      this.channelService.fetchDataChannelById(channelId).then(() => {
        this.channel = this.channelService.getChannel();

        // console.log("this.channel : ", this.channel)

        this.channel.posts?.sort((a: any, b: any) => {
          return new Date(a.postDateTime).getTime() - new Date(b.postDateTime).getTime();
        });
      });
    });

  }

  onDeleteChannel(id: number, nameChannel: string) {

    let conf = confirm(`Etes-vous sûr de vouloir supprimer ${nameChannel} ?`);

    if (conf)
      axios.delete(`${API_BASE_URL}/channels/${id}`)
        .then(() => {
          console.log("Canal supprimé avec succès!");
          setTimeout(() => {
            location.reload();
          }, 0);
          this.router.navigate(['/channels/1']);

        })
        .catch(error => {
          console.error("Erreur lors de la suppression du canal !:", error);
        });
  }


  onDeletePost(id: number, message: string) {
    let conf = confirm(`Etes-vous sûr de vouloir supprimer ${message} ?`);

    if (conf)
      axios.delete(`${API_BASE_URL}/post/${id}`)
        .then(() => {
          console.log("Post supprimé avec succès !");
          location.reload();
        })
        .catch(error => {
          console.error("Erreur lors de la suppression de post:", error);
        });
  }


}
