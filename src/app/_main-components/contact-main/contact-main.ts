import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ContactInfoService } from '../../_services/contact-info-service';
import { ContactInfoDto } from '../../_models/content-info';

@Component({
  selector: 'app-contact-main',
  standalone: false,
  templateUrl: './contact-main.html',
  styleUrl: './contact-main.css'
})
export class ContactMain implements OnInit {

  constructor(
    private contactInfoService: ContactInfoService,
    private cdr: ChangeDetectorRef
  ) { }

  contactInfos: ContactInfoDto[] = [];
  loading = true;

  ngOnInit() {
    this.getContactInfos();
  }

  getContactInfos() {
    this.contactInfoService.getContactInfos().subscribe({
      next: result => {
        this.contactInfos = result.data || [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
