import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './products-page.component.html'
})
export class ProductsPageComponent implements OnInit {
  title = 'Products'
  loading = true
  filterMetadata = { count: 0 }
  emittedSearchValue = ''

  public productService = inject(ProductService) // alternative constructor depend injection
  public modalService = inject(ModalService)

  constructor() { }

  ngOnInit(): void {
    this.productService.products.length ? this.loading = false :
      this.productService.getProducts()
        .subscribe(
          () => {
            this.loading = false
            this.productService.unsubscribe$.next() //one way to unsubscribe
            this.productService.unsubscribe$.complete();
          }
        )
  }

  handler(value: any) {
    this.emittedSearchValue = value;
  }

}
