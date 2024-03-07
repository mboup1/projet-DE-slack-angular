import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projet-de-slack-angular';

  constructor(public authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    //Pour rester connecter au chargement de l'application
    let isloggedin: string;
    let loggedUser: string;
    let idCurUser: number;

    isloggedin = localStorage.getItem('isloggedIn')!;
    loggedUser = localStorage.getItem('loggedUser')!;
    idCurUser = +localStorage.getItem('idCurUser')!;


    if (isloggedin != "true" || !loggedUser)
      this.router.navigate(['/login']);
    else
      this.authService.setLoggedUserFromLocalStorage(loggedUser, idCurUser);
  }

  onLogout() {
    this.authService.logout();
  }
}
