import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../_services/blog-service';
import { CategoryService } from '../../_services/category-service';
import { BlogDto } from '../../_models/blog';
import { CategoryDto } from '../../_models/category';

@Component({
  selector: 'home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  constructor(
    private blogService: BlogService,
    private categoryService: CategoryService
  ) { }

  blogs: BlogDto[] = [];
  categories: CategoryDto[] = [];
  featured: BlogDto | null = null;
  loading = true;

  ngOnInit() {
    this.blogService.getBlogs().subscribe({
      next: result => {
        this.blogs = result.data || [];
        this.featured = this.blogs[0] ?? null;
        this.loading = false;
      },
      error: () => this.loading = false
    });

    this.categoryService.getCategories().subscribe({
      next: result => this.categories = result.data || []
    });
  }

  blogsForCategory(categoryId: string): BlogDto[] {
    return this.blogs.filter(b => b.categoryId === categoryId).slice(0, 3);
  }

  categoryName(categoryId: string): string {
    return this.categories.find(c => c.id === categoryId)?.categoryName ?? '';
  }
}
