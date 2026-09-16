import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../_services/blog-service';
import { BlogDto } from '../../_models/blog';

@Component({
  selector: 'app-blogdetails',
  standalone: false,
  templateUrl: './blogdetails.html',
  styleUrl: './blogdetails.css'
})
export class Blogdetails implements OnInit {

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  blog: BlogDto | null = null;
  latestBlogs: BlogDto[] = [];
  loading = true;

  ngOnInit() {
    this.getBlogById();
    this.getLatestBlogs();
  }

  getBlogById() {
    const id = this.route.snapshot.params['id'];
    this.blogService.getBlogById(id).subscribe({
      next: result => {
        this.blog = result.data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getLatestBlogs() {
    this.blogService.getBlogs().subscribe({
      next: result => {
        this.latestBlogs = (result.data || []).slice(0, 4);
        this.cdr.detectChanges();
      }
    });
  }
}
