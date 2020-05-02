import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { of, Observable } from 'rxjs';

import { Products } from '../models/products';
import { ProductService } from '../services/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverGuard implements Resolve<Products> {

  constructor(private productService: ProductService) {  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Products> {

      if (route.params && route.params['id']) {
        return this.productService.loadById(route.params['id']);
      }

      return of({
        id: null,
        name: null,
        quantity: null,
        value: null
      });

  }


}
