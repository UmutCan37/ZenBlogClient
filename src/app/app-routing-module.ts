import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainLayout } from './_layouts/main-layout/main-layout';
import { AdminLayout } from './_layouts/admin-layout/admin-layout';

import { Home } from './_main-components/home/home';
import { Login } from './_main-components/login/login';
import { Blogdetails } from './_main-components/blogdetails/blogdetails';
import { ContactMain } from './_main-components/contact-main/contact-main';
import { Category } from './_admin_components/category/category';
import { Blog } from './_admin_components/blog/blog';
import { Comment } from './_admin_components/comment/comment';
import { ContentInfo } from './_admin_components/content-info/content-info';
import { Message } from './_admin_components/message/message';
import { Social } from './_admin_components/social/social';

import { AuthGuard } from './_guards/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        component: Home
      },
      {
        path: 'login',
        component: Login
      },
      {
        path: 'blogdetails/:id',
        component: Blogdetails
      },
      {
        path: 'contact',
        component: ContactMain
      }
    ]
  },
  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'category',
        pathMatch: 'full'
      },
      {
        path: 'category',
        component: Category
      },
      {
        path: 'blog',
        component: Blog
      },
      {
        path: 'comment',
        component: Comment
      },
      {
        path: 'contactinfo',
        component: ContentInfo
      },
      {
        path: 'message',
        component: Message
      },
      {
        path: 'social',
        component: Social
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
