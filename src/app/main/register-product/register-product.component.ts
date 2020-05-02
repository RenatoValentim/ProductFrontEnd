import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { ProductService } from '../services/product.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../models/products';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.scss']
})
export class RegisterProductComponent implements OnInit {

  formGroup: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private productService: ProductService,
              private location: Location,
              private alertService: AlertModalService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    const product: Products = this.route.snapshot.data['product'];

    this.formGroup = this.formBuilder.group({
      id: [product.id],
      name: [product.name, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
      quantity: [product.quantity, [Validators.required]],
      value: [product.value, [Validators.required]]
    });
  }

  hasError(field: string) {
    return this.formGroup.get(field).errors;
  }

  saveProduct() {
    this.submitted = true;
    if (this.formGroup.valid) {

      let messageSuccess = 'Produto Salvo com Sucesso.';
      let messageError = 'Erro ao salvar o produto. Tente novamente mais tarde.';
      if (this.formGroup.value.id) {
        messageSuccess = 'Produto Atualizar com Sucesso.';
        messageError = 'Erro ao Atualizar o produto. Tente novamente mais tarde.';
      }

      this.productService.saveOrUpdate(this.formGroup.value).subscribe(
        success => {
          this.alertService.showAlertSuccess(messageSuccess);
          this.location.back();
        },
        error => this.alertService.showAlertDanger(messageError)
      );
    }
    console.log(this.formGroup.value);
  }

  cancel() {
    this.submitted = false;
    this.formGroup.reset();
  }

}
