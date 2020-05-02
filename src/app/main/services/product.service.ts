import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, take, delay } from 'rxjs/operators';

import { Products } from '../models/products';
import { environment } from '../../../environments/environment';

const URL_PRODUCTS = '/produtos';
const URL_PRODUCT = '/produto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  listProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(environment.URL_API + URL_PRODUCTS)
      .pipe(
        delay(1000),
        tap(console.log)
      );
  }

  loadById(id: number): Observable<Products> {
    return this.http.get<Products>(`${environment.URL_API}/${URL_PRODUCT}/${id}`).pipe(take(1));
  }

  private saveProduct(product: Products): Observable<Products> {
    return this.http.post<Products>(environment.URL_API + URL_PRODUCT, product)
      .pipe(
        take(1),
        tap(console.log)
      );
  }

  private updateProduct(product: Products): Observable<Products> {
    return this.http.put<Products>(`${environment.URL_API}/${URL_PRODUCT}/${product.id}`, product).pipe(take(1));
  }

  saveOrUpdate(product: Products): Observable<Products> {
    if (product.id) {
      return this.updateProduct(product);
    }
    return this.saveProduct(product);
  }

  delete(id: number): Observable<Products> {
    return this.http.delete<Products>(`${environment.URL_API}/${URL_PRODUCT}/${id}`).pipe(take(1));
  }

}
