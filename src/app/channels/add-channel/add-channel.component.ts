import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { API_BASE_URL } from '../../config/config';

@Component({
  selector: 'app-add-channel',
  templateUrl: './add-channel.component.html',
  styleUrl: './add-channel.component.css'
})
export class AddChannelComponent {
  channelForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initChannelForm();
  }

  initChannelForm(): void {
    this.channelForm = this.formBuilder.group({

      name: ['', Validators.required],
    });
  }

  createChannel(channel: any) {
    console.log(channel)
    axios.post(`${API_BASE_URL}/channels`, channel)
      .then(response => {
        console.log("canal créé avec succès:", response);
        this.router.navigate(['/channels/1']);

      })
      .catch(error => {
        console.error("La création a échoué:", error);
      });
  }

}
