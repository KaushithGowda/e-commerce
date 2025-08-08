import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { of, tap, catchError, finalize, switchMap } from 'rxjs';
import { Product } from '../../models/product';
import { ProductApi } from '../../services/product';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.scss']
})
export class ProductDetail {
  private route = inject(ActivatedRoute);

  isLoading = signal(true);
  error = signal<string | null>(null);

  product = toSignal<Product | null | undefined>(
    this.route.paramMap.pipe(
      switchMap(pm => {
        this.isLoading.set(true);       
        this.error.set(null);
        const id = Number(pm.get('id'));
        return ProductApi.getProduct(id).pipe(
          tap(() => this.error.set(null)),
          catchError(err => {
            this.error.set(err?.message || 'Failed to load product');
            return of(null);               
          }),
          finalize(() => this.isLoading.set(false))
        );
      })
    ),
    { initialValue: undefined }
  );
}