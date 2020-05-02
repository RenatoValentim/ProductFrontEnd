import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { RegisterProductComponent } from './register-product/register-product.component';
import { ProductResolverGuard } from './guards/product-resolver.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'produtos', component: ProductsComponent },
  { path: 'novo-produto', component: RegisterProductComponent, resolve: { product: ProductResolverGuard } },
  { path: 'atualizar/:id', component: RegisterProductComponent, resolve: { product: ProductResolverGuard } }
];

export const MainRoutes = RouterModule.forChild(routes);
