import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { IProduct } from '../interfaces/product';
import { catchError, delay, Observable, ReplaySubject, retry, Subject, take, takeUntil, tap, throwError } from 'rxjs';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiPath = 'https://fakestoreapi.com/products';

  products: IProduct[] = []
  // selectedProduct: IProduct
  selectedProduct$ = new ReplaySubject<IProduct | null>(1)
  unsubscribe$ = new Subject<void>()

  constructor(
    private _http: HttpClient,
    private _errorService: ErrorService
  ) { }

  getProducts(): Observable<IProduct[]> {
    /** https://fakestoreapi.com/docs  */

    return this._http.get<IProduct[]>(this.apiPath,
      {
        params: new HttpParams(
          {
            fromObject: {
              limit: 0
            }
          }
        )
      })
      .pipe(
        delay(2000),
        retry(2),
        tap((_products: IProduct[]) => this.products = _products),
        takeUntil(this.unsubscribe$),//1 way to unsubscribe
        catchError(this.ErrorHandler.bind(this))
      )
  }

  create(product: IProduct): Observable<IProduct> {
    return this._http.post<IProduct>(this.apiPath, product).pipe(
      take(1),//2 way to unsubscribe
      tap(
        (_product: IProduct) => {
          //console.log('_product', _product)
          this.products.unshift(_product)
          //console.log('products', this.products)
        }
      ),
      catchError(this.ErrorHandler.bind(this))
    )
  }
  update(product: IProduct): Observable<IProduct> {
    return this._http.put<IProduct>(this.apiPath + '/' + product.id, product).pipe(
      take(1),//2 way to unsubscribe
      tap(
        (_product: IProduct) => {
          this.products.forEach(
            element => {
              if (element.id === _product.id) {
                if (element.title !== product.title) element.title = product.title
                if (element.price !== product.price) element.price = product.price
                if (element.description !== product.description) element.description = product.description
                if (element.category !== product.category) element.category = product.category
              }
            }
          )
        }
      ),
      catchError(this.ErrorHandler.bind(this))
    )
  }

  delete(product: IProduct): Observable<IProduct> {
    return this._http.delete<IProduct>(this.apiPath + '/' + product.id).pipe(
      tap(
        () => this.products = this.products.filter(element => element.id != product.id)
      ),
      catchError(this.ErrorHandler.bind(this))
    )
  }

  private ErrorHandler(error: HttpErrorResponse) {
    this._errorService.handle(error.message)
    return throwError(() => error.message)
  }

}
