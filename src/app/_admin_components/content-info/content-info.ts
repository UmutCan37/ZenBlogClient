import { ChangeDetectorRef, Component } from '@angular/core';
import { ContactInfoService } from '../../_services/contact-info-service';
import { SweetalertService } from '../../_services/sweetalert-service';
import { ContactInfoDto } from '../../_models/content-info';
import { Modal } from 'bootstrap';
declare const alertify: any;

@Component({
  selector: 'admin-content-info',
  standalone: false,
  templateUrl: './content-info.html',
  styleUrl: './content-info.css'
})
export class ContentInfo {

  constructor(
    private contactInfoService: ContactInfoService,
    private swal: SweetalertService,
    private cdr: ChangeDetectorRef
  ) {
    this.getContactInfos();
  }

  contactInfos: ContactInfoDto[] = [];

  newContactInfo: any = {};
  editContactInfo: any = {};

  errors: any = [];

  getContactInfos() {
    this.contactInfoService.getContactInfos().subscribe({
      next: result => {
        this.contactInfos = result.data;
        this.cdr.detectChanges();
      },
      error: result => console.log('getContactInfos hata:', result)
    });
  }

  createContactInfo() {
    this.contactInfoService.create(this.newContactInfo).subscribe({
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
        alertify.success("Contact Info Created!");
        this.newContactInfo = {};
        this.closeModal('createContactInfoModal');
        this.getContactInfos();
      }
    });
  }

  update() {
    this.contactInfoService.update(this.editContactInfo).subscribe({
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
        alertify.success("Contact Info Updated!");
        this.closeModal('editContactInfoModal');
        this.getContactInfos();
      }
    });
  }

  async delete(id: string) {
    const isConfirmed = await this.swal.areYouSure();

    if (isConfirmed) {
      this.contactInfoService.delete(id).subscribe({
        error: result => {
          console.error(result.error);
          alertify.error("An Error Occured!");
        },
        complete: () => {
          alertify.success("Contact Info Deleted!");
          this.getContactInfos();
        }
      });
    }
  }

  onSelected(model: ContactInfoDto) {
    this.editContactInfo = { ...model };
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
