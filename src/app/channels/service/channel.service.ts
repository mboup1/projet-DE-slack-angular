import { Injectable } from '@angular/core';
import { Channel } from '../../interfaces/channel';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { API_BASE_URL } from '../../config/config';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  channels: Channel[] = [];
  channelById: Channel[] = [];

  channel: Channel = { id: 0, name: '', deletable: false, posts: [], idUser: 0 };

  constructor(private http: HttpClient) { }

  fetchDataByChannels(): Observable<void> {
    return this.http.get(`${API_BASE_URL}/channels`).pipe(
      map((response: any) => {
        this.channels = response.map((channel: any) => ({
          id: channel.id,
          name: channel.name,
          deletable: channel.deletable,
          idUser: channel.idUser,
          posts: channel.posts,
          user: channel.posts.user,
        }));
      }),
      catchError((error) => {
        console.error('Error fetching JSON data:', error);
        throw error;
      })
    );
  }

  async fetchDataChannelById(id: number): Promise<void> {
    try {
      const response = await axios.get(`${API_BASE_URL}/channels/${id}`);
      this.channel = response.data
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
