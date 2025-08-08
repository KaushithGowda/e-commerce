import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductList } from './features/product/components/product-list/product-list';
import { ProductDetail } from './features/product/components/product-detail/product-detail';
import { CategoryList } from './features/product/components/category-list/category-list';

const routes: Routes = [
  { path: '', redirectTo: 'categories', pathMatch: 'full' },
  { path: 'products', component: ProductList },          
  { path: 'products/:id', component: ProductDetail },    
  { path: 'categories', component: CategoryList },       
  { path: 'categories/:name', component: ProductList },  
  { path: '**', redirectTo: 'categories' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }