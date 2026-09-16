import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';

import { App } from './app';
import { AdminLayout } from './_layouts/admin-layout/admin-layout';
import { MainLayout } from './_layouts/main-layout/main-layout';
import { Home } from './_main-components/home/home';
import { Login } from './_main-components/login/login';
import { Blogdetails } from './_main-components/blogdetails/blogdetails';
import { CommentForm } from './_main-components/comment-form/comment-form';
import { ContactMain } from './_main-components/contact-main/contact-main';
import { SendMessage } from './_main-components/send-message/send-message';
import { Category } from './_admin_components/category/category';
import { Blog } from './_admin_components/blog/blog';
import { Comment } from './_admin_components/comment/comment';
import { ContentInfo } from './_admin_components/content-info/content-info';
import { Message } from './_admin_components/message/message';
import { Social } from './_admin_components/social/social';

import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './_interceptors/auth-interceptor';

@NgModule({
  declarations: [
    App, AdminLayout, MainLayout,
    Home, Login, Blogdetails, CommentForm, ContactMain, SendMessage,
    Category, Blog, Comment, ContentInfo, Message, Social
  ],

  imports: [BrowserModule, AppRoutingModule, FormsModule],

  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],

  bootstrap: [App],
})
export class AppModule {}
