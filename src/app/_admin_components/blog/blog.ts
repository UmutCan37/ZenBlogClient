import { ChangeDetectorRef, Component } from '@angular/core';
import { BlogService } from '../../_services/blog-service';
import { CategoryService } from '../../_services/category-service';
import { SweetalertService } from '../../_services/sweetalert-service';
import { AuthService } from '../../_services/auth-service';
import { BlogDto } from '../../_models/blog';
import { CategoryDto } from '../../_models/category';
import { Modal } from 'bootstrap';
declare const alertify: any;

@Component({
  selector: 'admin-blog',
  standalone: false,
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class Blog {

  constructor(
    private blogService: BlogService,
    private categoryService: CategoryService,
    private swal: SweetalertService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.getBlogs();
    this.getCategories();
  }

  blogs: BlogDto[] = [];
  categories: CategoryDto[] = [];

  newBlog: any = {};
  editBlog: any = {};

  errors: any = [];

  getBlogs() {
    this.blogService.getBlogs().subscribe({
      next: result => {
        this.blogs = result.data;
        this.cdr.detectChanges();
      },
      error: result => console.log('getBlogs hata:', result)
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: result => {
        this.categories = result.data;
        this.cdr.detectChanges();
      },
      error: result => console.log('getCategories hata:', result)
    });
  }

  categoryName(categoryId: string): string {
    return this.categories.find(c => c.id === categoryId)?.categoryName ?? '-';
  }

  createBlog() {
    this.newBlog.userId = this.authService.getUserId();

    this.blogService.create(this.newBlog).subscribe({
      next: () => {
        this.errors = [];
      },
      error: result => {
        alertify.error("An Error Occured!");
        if (result.status === 400) {
          console.log(result.error.errors);
          this.errors = result.error.errors;
        }
      },
      complete: () => {
        alertify.success("Blog Created!");
        this.newBlog = {};
        this.closeModal('createBlogModal');
        this.getBlogs();
      }
    });
  }

  update() {
    this.blogService.update(this.editBlog).subscribe({
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
        alertify.success("Blog Updated!");
        this.closeModal('editBlogModal');
        this.getBlogs();
      }
    });
  }

  async delete(id: string) {
    const isConfirmed = await this.swal.areYouSure();

    if (isConfirmed) {
      this.blogService.delete(id).subscribe({
        error: result => {
          console.error(result.error);
          alertify.error("An Error Occured!");
        },
        complete: () => {
          alertify.success("Blog Deleted!");
          this.getBlogs();
        }
      });
    }
  }

  onSelected(model: BlogDto) {
    this.editBlog = { ...model };
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
