import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { API_BASE_URL } from '../../config/config';

@Component({
  selector: 'app-edit-channel',
  templateUrl: './edit-channel.component.html',
  styleUrl: './edit-channel.component.css'
})
export class EditChannelComponent {
  channelForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initChannelForm();

    this.route.queryParams.subscribe(params => {
      this.channelForm.patchValue({
        id: params['id'],
        name: params['name'],
      });
    });
  }


  initChannelForm(): void {
    this.channelForm = this.formBuilder.group({
      id: null,
      name: ['', Validators.required],
    });
  }



  updateChannel(id: number, updatedChannel: any): void {
    console.log("updatedChannel : ", updatedChannel)

    // axios.put(`${API_BASE_URL}/channels/${id}`, updatedChannel)
    //   .then(response => {
    //     console.log("Canal mis à jour avec succès:", response);
    //     this.router.navigate([`/channels/${id}`]);
    //   })
    //   .catch(error => {
    //     console.error("La mise à jour a échoué:", error);
    //   });
  }

}
