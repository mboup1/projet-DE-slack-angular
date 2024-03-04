import { Component } from '@angular/core';
import { User } from '../interfaces/user.model';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  erreur: number = 0;

  userForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.userForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
  }

  onLoggedin() {
    // console.log(this.userForm.value);

    let isValidUser: Boolean = this.authService.SignIn(this.userForm.value);
    if (isValidUser)
      this.router.navigate(['/']);
    else
      //   alert('Login ou mot de passe incorrecte!');
      this.erreur = 1;



  }

}
