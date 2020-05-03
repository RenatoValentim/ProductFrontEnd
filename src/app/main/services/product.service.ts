import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { CrudService } from '../../shared/crud-service';
import { URI_PRODUCTS } from '../../shared/urls';
import { Products } from '../models/products';

const URL_PRODUCT = environment.URL_API + URI_PRODUCTS;

@Injectable({
  providedIn: 'root'
})
export class ProductService extends CrudService<Products> {

  constructor(public http: HttpClient) {
    super(http, URL_PRODUCT);
  }

}
