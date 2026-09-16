import { ChangeDetectorRef, Component } from '@angular/core';
import { SocialService } from '../../_services/social-service';
import { SweetalertService } from '../../_services/sweetalert-service';
import { SocialDto } from '../../_models/social';
import { Modal } from 'bootstrap';
declare const alertify: any;

@Component({
  selector: 'admin-social',
  standalone: false,
  templateUrl: './social.html',
  styleUrl: './social.css'
})
export class Social {

  constructor(
    private socialService: SocialService,
    private swal: SweetalertService,
    private cdr: ChangeDetectorRef
  ) {
    this.getSocials();
  }

  socials: SocialDto[] = [];

  newSocial: any = {};
  editSocial: any = {};

  errors: any = [];

  getSocials() {
    this.socialService.getSocials().subscribe({
      next: result => {
        this.socials = result.data;
        this.cdr.detectChanges();
      },
      error: result => console.log('getSocials hata:', result)
    });
  }

  createSocial() {
    this.socialService.create(this.newSocial).subscribe({
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
        alertify.success("Social Link Created!");
        this.newSocial = {};
        this.closeModal('createSocialModal');
        this.getSocials();
      }
    });
  }

  update() {
    this.socialService.update(this.editSocial).subscribe({
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
        alertify.success("Social Link Updated!");
        this.closeModal('editSocialModal');
        this.getSocials();
      }
    });
  }

  async delete(id: string) {
    const isConfirmed = await this.swal.areYouSure();

    if (isConfirmed) {
      this.socialService.delete(id).subscribe({
        error: result => {
          console.error(result.error);
          alertify.error("An Error Occured!");
        },
        complete: () => {
          alertify.success("Social Link Deleted!");
          this.getSocials();
        }
      });
    }
  }

  onSelected(model: SocialDto) {
    this.editSocial = { ...model };
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
