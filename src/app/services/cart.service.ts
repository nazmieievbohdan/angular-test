import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, take, tap, throwError } from 'rxjs';
import { iCart } from '../interfaces/cart.interface';
import { IProduct } from '../interfaces/product';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  userId = 100
  apiPathCart = 'https://fakestoreapi.com/carts/'
  apiPathUserCart = 'https://fakestoreapi.com/carts/user/' + this.userId
  unsubscribe$ = new Subject<void>()

  cart: iCart[] = []
  currentCart: iCart
  productsInCart = 0

  constructor(
    private _http: HttpClient,
    private _errorService: ErrorService
  ) { }

  addNewCart(): Observable<iCart> {
    let data = {
      userId: this.userId,
      date: this.getCurrentDate(),
      products: []
    }
    return this._http.post<iCart>(this.apiPathCart, data).pipe(
      tap(
        (_cart: iCart) => this.currentCart = _cart
      ),
      catchError(this.ErrorHandler.bind(this))
    )
  }

  addToCart(product: IProduct, quantity: number): Observable<iCart> {
    if (this.currentCart === undefined) {
      this._addProductToCart(product, quantity)
    }
    else {
      if (!this._updateProductInCart(product, quantity)) this._addProductToCart(product, quantity)
    }
    return this.updateUserCart()

  }
  removeFromCart(product: IProduct): Observable<iCart> {
    if (this.currentCart !== undefined) {
      this._removeProductFromCart(product)
    }
    return this.updateUserCart()
  }

  getCurrentDate(): string {
    let date = new Date();
    return String(date.getFullYear() + String(date.getMonth() + 1).padStart(2, '0') + date.getDate()).padStart(2, '0');
  }

  countProductsInCart() {
    let initialValue = 0
    return this.currentCart.products.reduce(
      (accumulator, element) => accumulator + element.quantity,
      initialValue
    )
  }

  updateUserCart() {
    return this._http.put<iCart>(this.apiPathCart + this.currentCart.id, this.currentCart).pipe(
      take(1),//2 way to unsubscribe
      tap(
        (_cart: iCart) => this.productsInCart = this.countProductsInCart()
      ),
      catchError(this.ErrorHandler.bind(this))
    )
  }

  _addProductToCart(product: IProduct, quantity: number): void {
    this.currentCart.products.push(
      {
        productId: product.id,
        quantity: quantity
      }
    )
  }
  _removeProductFromCart(product: IProduct): void {
    this.currentCart.products = this.currentCart.products.filter(
      element => element.productId != product.id
    )
  }

  _updateProductInCart(product: IProduct, quantity: number): boolean {
    let updated = false
    this.currentCart.products.forEach(
      _product => {
        if (_product.productId === product.id) {
          _product.quantity += quantity
          updated = true
        }
      }
    )
    return updated
  }

  private ErrorHandler(error: HttpErrorResponse) {
    this._errorService.handle(error.message)
    return throwError(() => error.message)
  }
}
