import { ChangeDetectorRef, Component } from '@angular/core';
import { CommentService } from '../../_services/comment-service';
import { BlogService } from '../../_services/blog-service';
import { SweetalertService } from '../../_services/sweetalert-service';
import { CommentDto } from '../../_models/comment';
import { BlogDto } from '../../_models/blog';
import { Modal } from 'bootstrap';
declare const alertify: any;

@Component({
  selector: 'admin-comment',
  standalone: false,
  templateUrl: './comment.html',
  styleUrl: './comment.css'
})
export class Comment {

  constructor(
    private commentService: CommentService,
    private blogService: BlogService,
    private swal: SweetalertService,
    private cdr: ChangeDetectorRef
  ) {
    this.getComments();
    this.getBlogs();
  }

  comments: CommentDto[] = [];
  blogs: BlogDto[] = [];

  editComment: any = {};

  errors: any = [];

  getComments() {
    this.commentService.getComments().subscribe({
      next: result => {
        this.comments = result.data;
        this.cdr.detectChanges();
      },
      error: result => console.log('getComments hata:', result)
    });
  }

  getBlogs() {
    this.blogService.getBlogs().subscribe({
      next: result => {
        this.blogs = result.data;
        this.cdr.detectChanges();
      },
      error: result => console.log('getBlogs hata:', result)
    });
  }

  blogTitle(blogId: string): string {
    return this.blogs.find(b => b.id === blogId)?.title ?? '-';
  }

  update() {
    this.commentService.update(this.editComment).subscribe({
      next: () => {
        this.errors = [];
      },
      error: result => {
        alertify.error("An Error Occured!");
        if (result.status === 400) {
          console.log(result.error);
          this.errors = result.error.errors;
        }
      },
      complete: () => {
        alertify.success("Comment Updated!");
        this.closeModal('editCommentModal');
        this.getComments();
      }
    });
  }

  async delete(id: string) {
    const isConfirmed = await this.swal.areYouSure();

    if (isConfirmed) {
      this.commentService.delete(id).subscribe({
        error: result => {
          console.error(result.error);
          alertify.error("An Error Occured!");
        },
        complete: () => {
          alertify.success("Comment Deleted!");
          this.getComments();
        }
      });
    }
  }

  onSelected(model: CommentDto) {
    this.editComment = { ...model };
  }

  private closeModal(id: string) {
    const el = document.getElementById(id);
    if (el) {
      const instance = Modal.getInstance(el);
      if (instance) instance.hide();
    }

    setTimeout(() => {
      document.body.classList.remove('modal-open');
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('padding-right');
      document.querySelectorAll('.modal-backdrop').forEach(b => b.remove());
    }, 300);
  }
}
