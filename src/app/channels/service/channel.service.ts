import { Injectable } from '@angular/core';
import { Channel } from '../../interfaces/channel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, catchError, map } from 'rxjs';
import { API_BASE_URL } from '../../config/config';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  channels: Channel[] = [];
  channelById: Channel[] = [];

  channel: Channel = { id: 0, name: '', deletable: false, posts: [], idUser: 0 };
  private channelIdSubject = new Subject<number>;




  setChannelId(channelId: number): void {
    this.channelIdSubject.next(channelId);
  }

  getChannelId(): Subject<number> {
    return this.channelIdSubject;
  }


  constructor(private http: HttpClient,
  ) { }

  // Récupérer la liste des canaux depuis l'API
  fetchDataByChannels(): Observable<void> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })

    return this.http.get(`${API_BASE_URL}/channels`, { headers: httpHeaders }).pipe(
      map((response: any) => {
        this.channels = response.map((channel: any) => ({
          id: channel.id,
          name: channel.name,
          deletable: channel.deletable,
          idUser: channel.idUser,
          posts: channel.posts,
          user: channel.posts.user,

        }));
        console.log("this.channels : ", this.channels)

      }),
      catchError((error) => {
        console.error('Error fetching JSON data:', error);
        throw error;
      })
    );
  }

  // Récupérer un canal par son ID depuis l'API
  async fetchDataChannelById(id: number): Promise<void> {
    try {
      const response = await axios.get(`${API_BASE_URL}/channels/${id}`);
      this.channel = response.data

      this.setChannelId(id);  // Émettre le nouvel ID du canal
    } catch (error) {
      console.error('Error fetching JSON data:', error);
    }
  }


  getChannels(): Channel[] {
    return this.channels;
  }

  getChannel(): Channel {
    return this.channel;
  }

}
