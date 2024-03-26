import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from './users/service/user.service';
import { User } from './interfaces/user';
import { Observable, catchError, map } from 'rxjs';
import { API_BASE_URL } from './config/config';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users: User[] = [];
  public loggedUser!: string;
  public isloggedIn: Boolean = false;
  public idCurUser!: number;
  public roles!: string[];
  token!: string;
  private helper = new JwtHelperService();
  apiURL: string = 'http://localhost:8080';

  constructor(
    private router: Router,
    private http: HttpClient,
    public userService: UserService,
  ) { }



  login(user: User) {
    console.log("user in login : ", user);

    return this.http.post<User>(this.apiURL + '/login', user, { observe: 'response' });
  }

  saveToken(jwt: string) {
    localStorage.setItem('jwt', jwt);
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJWT();
  }

  getToken(): string {
    return this.token;
  }

  decodeJWT() {
    if (this.token == undefined)
      return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
  }



  fetchDataUsers(): Observable<void> {
    return this.http.get(`${API_BASE_URL}/users`).pipe(
      map((response: any) => {
        this.users = response.map((user: any) => ({
          id: user.id,
          name: user.name,
          username: user.username,
          password: user.password,
          // idChannel: user.idChannel,
          roles: user.roles,
        }));
      }),
      catchError((error) => {
        console.error('Error fetching JSON data:', error);
        throw error;
      })
    );
  }

  getUsers(): User[] {
    return this.users;
  }



  SignIn(user: User): Boolean {
    let validUser: Boolean = false;

    this.users.forEach((curUser) => {

      if (user.username == curUser.username && user.password == curUser.password) {
        console.log("curUser : ",curUser)
        validUser = true;
        this.loggedUser = curUser.name;
        this.idCurUser = curUser.id;
        // console.log("idCurUser  :  ", this.idCurUser);

        this.isloggedIn = true;
        this.roles = curUser.roles;
        localStorage.setItem('loggedUser', this.loggedUser);
        localStorage.setItem('idCurUser', `${this.idCurUser}`);
        localStorage.setItem('isloggedIn', String(this.isloggedIn));
      }
    });

    return validUser;
  }

  isAdmin(): Boolean {
    if (!this.roles)
      return false;
    return (this.roles.indexOf('ADMIN') > -1);
    ;
  }


  logout() {
    this.isloggedIn = false;
    this.loggedUser = undefined!;
    this.roles = undefined!;
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('idCurUser');
    localStorage.setItem('isloggedIn', String(this.isloggedIn));
    this.router.navigate(['/login']);
  }

  setLoggedUserFromLocalStorage(login: string, idCurUser: number) {
    this.loggedUser = login;
    this.idCurUser = idCurUser;
    this.isloggedIn = true;
    this.getUserRoles(login);
  }

  getUserRoles(username: string) {
    this.users.forEach((curUser) => {
      if (curUser.username == username) {
        this.roles = curUser.roles;
      }
    });
  }

  // users: User[] = [{ "username": "admin", "password": "123", "roles": ['ADMIN'] },
  //   { "username": "nad", "password": "123", "roles": ['USER'] },
  //   { "username": "a", "password": "a", "roles": ['ADMIN'] },
  // { "username": "dame", "password": "123", "roles": ['ADMIN'] }
  // ];

}
