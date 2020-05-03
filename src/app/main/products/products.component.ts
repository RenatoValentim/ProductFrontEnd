import { AlertModalService } from './../../shared/alert-modal.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable, Subject, EMPTY } from 'rxjs';
import { catchError, take, switchMap } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { ProductService } from '../services/product.service';
import { Products } from '../models/products';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;

  products$: Observable<Products[]>;
  selectedProduct: Products;

  error$ = new Subject<boolean>();

  bsModalRef: BsModalRef;

  constructor(private productService: ProductService,
              private modalService: BsModalService,
              private alertService: AlertModalService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.products$ = this.productService.listProducts()
      .pipe(
        catchError(err => {
          console.error(err);
          this.handleError();
          return EMPTY;
        })
      );
  }

  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar a página. Tente novamente mais tarde.');
  }

  update(id: number) {
    this.router.navigate(['atualizar', id]);
  }

  delete(product: Products) {
    this.selectedProduct = product;
    const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja remover esse produto?');
    result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.productService.delete(product.id) : EMPTY)
      )
      .subscribe(
        success => {
          this.refresh();
          this.alertService.showAlertSuccess('Produto Removido com Sucesso.');
        },
        error => {
          this.alertService.showAlertDanger('Erro ao remover o produto . Tente novamente mais tarde.');
        });
  }

  confirmDelete() {
    this.productService.delete(this.selectedProduct.id)
      .subscribe(
        success => {
          this.refresh();
          this.alertService.showAlertSuccess('Produto Removido com Sucesso.');
          this.deleteModalRef.hide();
        },
        error => {
          this.alertService.showAlertDanger('Erro ao remover o produto . Tente novamente mais tarde.');
          this.deleteModalRef.hide();
        });
  }

  declineDelete() {
    this.deleteModalRef.hide();
  }

}
