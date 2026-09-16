import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../../_services/comment-service';
import { AuthService } from '../../_services/auth-service';
import { CommentDto } from '../../_models/comment';
declare const alertify: any;

@Component({
  selector: 'comment-form',
  standalone: false,
  templateUrl: './comment-form.html',
  styleUrl: './comment-form.css'
})
export class CommentForm {

  constructor(
    private commentService: CommentService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  newComment: any = {};
  submitting = false;

  get loggedIn() {
    return this.authService.isLoggedIn();
  }

  get currentUser() {
    return this.authService.getCurrentUser();
  }

  createComment() {
    this.submitting = true;
    this.newComment.blogId = this.route.snapshot.params['id'];
    this.newComment.userId = this.authService.getUserId();

    this.commentService.create(this.newComment).subscribe({
      error: () => {
        this.submitting = false;
        alertify.error("Comment Post Failed!");
      },
      complete: () => {
        this.submitting = false;
        alertify.success("Comment Posted!");
        location.reload();
      }
    });
  }
}
