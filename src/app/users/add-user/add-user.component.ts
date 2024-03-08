import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { API_BASE_URL } from '../../config/config';
import { AuthService } from '../../auth.service';
import { UserService } from '../service/user.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  userForm!: FormGroup;
  emailsList: User[] = [];
  erreur: number = 0;



  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.userForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.userService.getAllEmails().subscribe((emails) => {
      this.emailsList = emails;
    });

    this.initUserForm();
  }

  initUserForm(): void {
    this.userForm = this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      roles: ["USER"]

    });
  }

  createUser(user: any) {
    // Check if user.email is included in this.emailsList
    // if (this.emailsList.includes(user.email)) {
    //   this.erreur = 1;

    //   console.log("Email already exists:", user.email);
    //   return;
    // }

    user.roles = ["USER"];

    console.log(user);

    axios.post(`${API_BASE_URL}/users`, user)
      .then(response => {
        console.log("user ajouté avec succès:", response);

        // Add the ID to this.userForm.value
        this.userForm.patchValue({ id: response.data.id });

        console.log("this.userForm.value : ", this.userForm.value);
        setTimeout(() => {
          location.reload();
        }, 0);
        this.router.navigate(['/login']);

        // Appeler onLoggedin après la création de l'utilisateur
        // this.onLoggedin();

      })
      .catch(error => {
        console.error("L'ajout a échoué:", error);
      });

  }


  onLoggedin() {
    console.log("this.userForm.value : ", this.userForm.value);

    let isValidUser: Boolean = this.authService.SignIn(this.userForm.value);

    if (isValidUser)
      this.router.navigate(['/']);
    // else
    //   //   alert('Login ou mot de passe incorrecte!');
    //   this.erreur = 1;



  }

}
