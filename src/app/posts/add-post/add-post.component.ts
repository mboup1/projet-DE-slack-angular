import { Component } from '@angular/core';
import { ChannelService } from '../../channels/service/channel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../interfaces/post';
import axios from 'axios';
import { API_BASE_URL } from '../../config/config';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent {
  postForm!: FormGroup;
  posts: Post[] = [];
  idChannel!: number;
  channelName: string = '';



  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private channelsService: ChannelService

  ) { }

  ngOnInit(): void {
    this.initPostForm();
    this.route.params.subscribe(params => {
      this.idChannel = +params['id'];
      this.postForm.get('idChannel')?.setValue(this.idChannel);

      // console.log("idChannel", this.idChannel);

      this.getChannelName();


    });
  }

  initPostForm(): void {
    this.postForm = this.formBuilder.group({

      message: ['', Validators.required],
      idChannel: ['', Validators.required],
    });
  }


  getChannelName(): void {
    this.channelsService.fetchDataChannelById(this.idChannel)
      .then(() => {
        this.channelName = this.channelsService.getChannel().name;
        // console.log("this.channelName : ", this.channelName)
      })
      .catch(error => {
        console.error('Error fetching channel data:', error);
      });
  }


  createPost(post: any) {
    console.log("createPost : ", post)
    axios.post(`${API_BASE_URL}/post`, post)
      .then(response => {
        console.log("Post created successfully ", response);
        this.router.navigate(['/channels', this.idChannel]).then(() => {
          this.initPostForm();
          location.reload();
        });
      })
      .catch(error => {
        console.error("Creation failed ", error);
      });
  }

}
