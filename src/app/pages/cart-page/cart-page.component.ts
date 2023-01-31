import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html'
})
export class CartPageComponent {
  title = 'Cart'
  cartMetadata = { count: 0, price: 0 }

  constructor(
    public cartService: CartService,
    public productService: ProductService
    ) { }

}
