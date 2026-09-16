import { SweetalertService } from '../../_services/sweetalert-service';
import { ChangeDetectorRef, Component } from '@angular/core';
import { CategoryService } from '../../_services/category-service';
import { CategoryDto } from '../../_models/category';
import { Modal } from 'bootstrap';
declare const alertify :any;

@Component({
  selector: 'admin-category',
  standalone: false,
  templateUrl: './category.html',
  styleUrl: './category.css'
})
export class Category {

constructor(private categoryService : CategoryService,
            private swal: SweetalertService,
            private cdr: ChangeDetectorRef
){

  this.getCategories();
}

categories: CategoryDto[];
newCategory: CategoryDto = new CategoryDto();
editCategory:any = {};
errors: any=[];


getCategories(){
  this.categoryService.getCategories().subscribe({
    next: result=> {
      this.categories= result.data;
      this.cdr.detectChanges();
    },
    error: result=> console.log('getCategories hata:', result)
  }
    )
  };

  createCategory(){
      this.categoryService.create(this.newCategory).subscribe({
        next: () => {
          this.newCategory = new CategoryDto();
          this.errors = [];
        },
        error: result =>{
            alertify.error("An Error Occured!");

            if(result.status===400){
              console.log(result.error.errors)
              this.errors= result.error.errors
            };
        } ,
        complete: () => {
          alertify.success("Category Created!");
          this.closeModal('createModal');
          this.getCategories();
        }
      })
  };

async delete(id){

const isConfirmed = await this.swal.areYouSure();


if(isConfirmed){
this.categoryService.delete(id).subscribe({
  error: result => {console.error(result.error);
    alertify.error("An Error Occured!")
  },
  complete: () => {alertify.success("Category Deleted!");
    this.getCategories();
  }
})

}
else{
  console.log("Delete Reverted")
}



};

update(){
this.categoryService.update(this.editCategory).subscribe({
  next: () => {
    this.errors = [];
  },
  error: result => {
    alertify.error("An Error Occured!");

    if(result.status===400){
              console.log(result.error)
              this.errors= result.error.errors
            };
  },
  complete: () => {
    alertify.success("Category Updated!");
    this.closeModal('editModal');
    this.getCategories();
  }

})

};


onSelected(model:CategoryDto){
  this.editCategory= { ...model };
}

private closeModal(id: string){
  const el = document.getElementById(id);
  if (el) {
    const instance = Modal.getInstance(el);
    if (instance) {
      instance.hide();
    }
  }

  // Bootstrap bazen backdrop/scroll-lock'u temizlemeyi atlıyor, garanti altına alıyoruz
  setTimeout(() => {
    document.body.classList.remove('modal-open');
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('padding-right');
    document.querySelectorAll('.modal-backdrop').forEach(b => b.remove());
  }, 300);
}

}
