import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductsComponent } from './products/products.component';
import { MainRoutes } from './main.routing';
import { HomeComponent } from './home/home.component';
import { RegisterProductComponent } from './register-product/register-product.component';

@NgModule({
  declarations: [ProductsComponent, HomeComponent, RegisterProductComponent],
  imports: [
    CommonModule,
    MainRoutes,
    ReactiveFormsModule
  ]
})
export class MainModule { }
