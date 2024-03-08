import { Component } from '@angular/core';
import { ChannelService } from '../../channels/service/channel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../interfaces/post';
import axios from 'axios';
import { API_BASE_URL } from '../../config/config';
import { AuthService } from '../../auth.service';
import { User } from '../../interfaces/user';
import { UserService } from '../../users/service/user.service';

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
  idUser!: number;
  users: User[] = [];
  // emailsList: User[] = [];



  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private channelsService: ChannelService,
    public authService: AuthService,
    // private userService: UserService,


  ) { }

  ngOnInit(): void {

    // this.userService.getAllEmails().subscribe((emails) => {
    //   this.emailsList = emails;

    //   console.log("this.emailsList : ", this.emailsList)
    // });

    this.initPostForm();
    this.route.params.subscribe(params => {
      this.idChannel = +params['id'];
      this.postForm.get('idChannel')?.setValue(this.idChannel);
      this.idUser = this.authService.idCurUser;
      this.postForm.get('idUser')?.setValue(this.idUser);

      this.getChannelName();

    });

    this.authService.fetchDataUsers().subscribe(() => {
      this.users = this.authService.getUsers();


      // console.log("users add-post : ", this.users)

      // Afficher tous les noms d'utilisateur dans la console
      // const userIds = this.users.map(user => user.id);
      // console.log("ids users header2 usernames: ", userIds);
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


  initPostForm(): void {
    this.postForm = this.formBuilder.group({

      message: ['', Validators.required],
      idChannel: ['', Validators.required],
      idUser: ['', Validators.required],
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

}
