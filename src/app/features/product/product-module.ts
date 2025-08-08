import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing-module';
import { ProductList } from './components/product-list/product-list';
import { ProductDetail } from './components/product-detail/product-detail';
import { CategoryList } from './components/category-list/category-list';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ProductList,
    ProductDetail,
    CategoryList
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ProductRoutingModule
  ],
})
export class ProductModule { }
