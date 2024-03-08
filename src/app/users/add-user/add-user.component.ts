import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { API_BASE_URL } from '../../config/config';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  userForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initUserForm();
  }

  initUserForm(): void {
    this.userForm = this.formBuilder.group({

      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      roles: ["USER"]

    });
  }

  createUser(user: any) {
    user.roles = ["USER"];

    console.log(user)
    axios.post(`${API_BASE_URL}/users`, user)
      .then(response => {
        console.log("user ajouté avec succès:", response);
        // setTimeout(() => {
        //   location.reload();
        // }, 1000);
        this.router.navigate(['/channels/1']);
      })
      .catch(error => {
        console.error("L'ajout a échoué:", error);
      });
  }

}
