import { API_BASE_URL } from './../../config/config';
import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user';
import axios from 'axios';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User[] = [];


  constructor(private http: HttpClient) { }


  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${API_BASE_URL}/users`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${API_BASE_URL}`, user);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${API_BASE_URL}/users/${id}`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${API_BASE_URL}/users/${id}`);
  }
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${API_BASE_URL}/users/${user.id}`, user);
  }
}
