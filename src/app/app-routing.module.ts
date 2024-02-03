import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'product-details', component: ProductsDetailsComponent},
  {path: 'cart', component: CartComponent},
  {path: 'orders', component: OrderComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
