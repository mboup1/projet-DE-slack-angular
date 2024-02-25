import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddChannelComponent } from './channels/add-channel/add-channel.component';
import { EditChannelComponent } from './channels/edit-channel/edit-channel.component';
import { AddPostComponent } from './posts/add-post/add-post.component';
import { EditPostComponent } from './posts/edit-post/edit-post.component';
import { HeaderComponent } from './header/header.component';
import { ListPostsComponent } from './posts/list-posts/list-posts.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [
  { path: 'channels', component: SidebarComponent },
  { path: 'addChannel', component: AddChannelComponent },
  { path: 'updateChannel', component: EditChannelComponent },
  { path: 'addPost', component: AddPostComponent },
  { path: 'editPost', component: EditPostComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'channels/:id', component: ListPostsComponent },
  { path: '**', redirectTo: 'channels/1' },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
