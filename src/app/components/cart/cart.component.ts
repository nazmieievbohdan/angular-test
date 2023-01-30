import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit, OnDestroy {
  private cartSubscription: Subscription

  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.addNewCart().subscribe()
  }

  ngOnDestroy(): void {
    this.cartSubscription?.unsubscribe()
  }

}
