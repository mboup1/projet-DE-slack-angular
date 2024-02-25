import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  // apiUrl: string = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {}


}


