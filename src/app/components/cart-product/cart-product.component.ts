import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from '../../interfaces/product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html'
})
export class CartProductComponent {
  @Input() product: IProduct
  private subscriptionDelete: Subscription

  loading = {
    delete: false
  }
  
  constructor(
    private cartService:CartService
  ) { }

  delete(product: IProduct) {
    if (confirm("Are you sure to delete " + product.title)) {
      this.loading.delete = true
      this.subscriptionDelete = this.cartService.removeFromCart(product).subscribe(
        () => this.loading.delete = false
      )
    }
  }

  ngOnDestroy(): void {
    this.subscriptionDelete?.unsubscribe() //not great way to unsubscribe
  }
}
