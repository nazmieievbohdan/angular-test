import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../interfaces/product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  isVisible$ = new BehaviorSubject<boolean>(false)

  public productService = inject(ProductService)

  constructor() { }

  open(selectedProduct: IProduct | null = null) {
    this.productService.selectedProduct$.next(selectedProduct)
    this.isVisible$.next(true)
  }

  close() {
    this.isVisible$.next(false)
  }

}
