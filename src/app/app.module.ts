import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListChannelsComponent } from './channels/list-channels/list-channels.component';
import { AddChannelComponent } from './channels/add-channel/add-channel.component';
import { EditChannelComponent } from './channels/edit-channel/edit-channel.component';
import { ListPostsComponent } from './posts/list-posts/list-posts.component';
import { AddPostComponent } from './posts/add-post/add-post.component';
import { EditPostComponent } from './posts/edit-post/edit-post.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { ErrorComponent } from './errors/error/error.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';

@NgModule({
  declarations: [
    AppComponent,
    ListChannelsComponent,
    AddChannelComponent,
    EditChannelComponent,
    ListPostsComponent,
    AddPostComponent,
    EditPostComponent,
    SidebarComponent,
    HeaderComponent,
    ListUsersComponent,
    EditUserComponent,
    AddUserComponent,
    ErrorComponent,
    LoginComponent,
    ForbiddenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
