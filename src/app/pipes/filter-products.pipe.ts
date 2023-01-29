import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../interfaces/product';

@Pipe({
  name: 'filterProducts'
})
export class FilterProductsPipe implements PipeTransform {

  transform(products: IProduct[], search: string, filterMetadata: any): IProduct[] {
    if (!products) return []
    if (!search) {
      filterMetadata.count = products.length
      return products
    }

    let filtered = search.length ? products.filter(p => p.title.toLowerCase().includes(search.toLowerCase())) : products
    filterMetadata.count = filtered.length
    return filtered
  }

}
