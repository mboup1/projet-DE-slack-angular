import { Injectable } from '@angular/core';
import { Channel } from '../../interfaces/channel';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { API_BASE_URL } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  channels: Channel[] = [];

  constructor(private http: HttpClient) { }

  fetchData(): Observable<void> {
    return this.http.get(`${API_BASE_URL}/channels`).pipe(
      map((response: any) => {
        this.channels = response.map((channel: any) => ({
          id: channel.id,
          name: channel.name,
          deletable: channel.deletable,
          idUser: channel.idUser,
          posts: channel.posts,
          user: channel.user,
        }));
      }),
      catchError((error) => {
        console.error('Error fetching JSON data:', error);
        throw error;
      })
    );
  }

  getChannels(): Channel[] {
    return this.channels;
  }
}
