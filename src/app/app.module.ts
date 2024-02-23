import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListChannelsComponent } from './channels/list-channels/list-channels.component';
import { AddChannelComponent } from './channels/add-channel/add-channel.component';
import { EditChannelComponent } from './channels/edit-channel/edit-channel.component';
import { ChannelServicesComponent } from './channels/channel-services/channel-services.component';
import { ListPostsComponent } from './posts/list-posts/list-posts.component';
import { AddPostComponent } from './posts/add-post/add-post.component';
import { EditPostComponent } from './posts/edit-post/edit-post.component';
import { PostServicesComponent } from './posts/post-services/post-services.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    ListChannelsComponent,
    AddChannelComponent,
    EditChannelComponent,
    ChannelServicesComponent,
    ListPostsComponent,
    AddPostComponent,
    EditPostComponent,
    PostServicesComponent,
    SidebarComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
