import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductList } from './features/product/components/product-list/product-list';
import { ProductDetail } from './features/product/components/product-detail/product-detail';
import { CategoryList } from './features/product/components/category-list/category-list';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },

  { path: 'products', component: ProductList },          // /products
  { path: 'products/:id', component: ProductDetail },    // /products/:id

  { path: '', component: CategoryList },       // /categories
  { path: 'categories/:name', component: ProductList },  // /categories/:name (reuse list)

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }