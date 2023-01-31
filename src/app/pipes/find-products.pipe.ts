import { Pipe, PipeTransform } from '@angular/core';
import { iCartProduct } from '../interfaces/cart.interface';
import { IProduct } from '../interfaces/product';

@Pipe({
  name: 'findProducts'
})
export class FindProductsPipe implements PipeTransform {

  transform(cartProducts: iCartProduct[], products: IProduct[], filterMetadata: any): IProduct[] {
    if (!cartProducts) return []
    if (!products) {
      filterMetadata.count = cartProducts.length
      return []
    }

    let priceAccumulator = 0

    let filtered = cartProducts.map(
      cartElement => {
        let prom = products.filter(p => p.id === cartElement.productId)
        prom[0].quantity = cartElement.quantity
        priceAccumulator += cartElement.quantity*prom[0].price
        return prom
      }
    )

    filterMetadata.count = filtered.length
    filterMetadata.price = priceAccumulator
    return filtered.flat()
  }

}
