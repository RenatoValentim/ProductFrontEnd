import { AlertModalService } from './../../shared/alert-modal.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable, empty, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
          return empty();
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
    this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });
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
