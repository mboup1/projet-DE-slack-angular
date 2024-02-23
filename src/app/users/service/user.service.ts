import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user';
import axios from 'axios';
import { API_BASE_URL } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User[] = [];


  constructor() { }

  getUser(id: number): Promise<User> {
    return axios.get(`${API_BASE_URL}/users/${id}`)
      .then(response => response.data as User)
      .catch(error => {
        console.error('Error fetching user data:', error);
        throw error;
      });
  }
}
