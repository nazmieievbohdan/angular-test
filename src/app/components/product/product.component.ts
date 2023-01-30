import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from '../../interfaces/product';
import { CartService } from '../../services/cart.service';
import { ModalService } from '../../services/modal.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnDestroy {
  @Input() product: IProduct
  private subscriptionDelete: Subscription
  private subscriptionEdit: Subscription
  private subscriptionBuy: Subscription

  loading = {
    delete: false,
    edit: false,
    buy: false
  }
  details = false

  constructor(
    private productService: ProductService,
    public modalService: ModalService,
    private cartService:CartService
  ) { }

  delete(product: IProduct) {
    if (confirm("Are you sure to delete " + product.title)) {
      this.loading.delete = true
      console.log('product.id', product.id)
      this.subscriptionDelete = this.productService.delete(product).subscribe(
        () => this.loading.delete = false
      )
    }
  }

  edit(product: IProduct) {
    this.loading.edit = true
    this.modalService.open(product)
    this.subscriptionEdit = this.modalService.isVisible$.subscribe(
      modalStatus => {
        if (modalStatus === false) this.loading.edit = false
      }
    )
  }

  toCart(product: IProduct) {
      this.loading.buy = true
      this.subscriptionBuy = this.cartService.addToCart(product, 1)
      .subscribe(
        () => this.loading.buy = false
      )
  }

  ngOnDestroy(): void {
    this.subscriptionDelete?.unsubscribe() //not great way to unsubscribe
    this.subscriptionEdit?.unsubscribe()
    this.subscriptionBuy?.unsubscribe()
  }
}
