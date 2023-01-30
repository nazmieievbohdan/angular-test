import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html'
})
export class CreateProductComponent {
  buttonText = 'Save'

  createProductForm: FormGroup = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    price: new FormControl<number>(0, [
      Validators.required,
      Validators.min(0)
    ]),
    description: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(100)
    ]),
    category: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    id: new FormControl<string>('')
  })

  constructor(
    private productService: ProductService,
    private modalService: ModalService) { }

  ngOnInit() {
    this.productService.selectedProduct$.subscribe(
      value => {
        if (value) {
          this.createProductForm.setValue({
            title: value.title,
            price: value.price,
            description: value.description,
            category: value.category,
            id: value.id
          })
        }
      }
    )
  }

  onSubmit() {
    if (this.createProductForm.invalid) return
    this.buttonText = 'Loading'

    let objProduct = {
      title: this.createProductForm.value.title as string,
      price: this.createProductForm.value.price as number,
      description: this.createProductForm.value.description as string,
      image: 'https://i.pravatar.cc',
      category: this.createProductForm.value.category as string,
      id: this.createProductForm.value.id as number
    }

    if (objProduct.id) {
      this.productService.update(objProduct).subscribe(
        () => this.modalService.close()
      )
    } else {
      this.productService.create(objProduct).subscribe(
        () => this.modalService.close()
      )
    }
  }

  get title() {
    return this.createProductForm.get('title') as FormControl
  }
  get price() {
    return this.createProductForm.get('price') as FormControl
  }
  get description() {
    return this.createProductForm.get('description') as FormControl
  }
  get category() {
    return this.createProductForm.get('category') as FormControl
  }

}
