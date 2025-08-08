import { Component, signal, inject, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, of, tap, catchError, finalize } from 'rxjs';
import { Product } from '../../models/product';
import { ProductApi } from '../../services/product';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss']
})
export class ProductList {
  private route = inject(ActivatedRoute);

  isLoading = signal(true);
  error = signal<string | null>(null);

  // search & pagination state
  search = signal('');
  page = signal(1);
  pageSize = signal(9); // 6/9/12 are nice

  fixImageUrl(url: string): string {
    return url?.includes('+') ? url.replace(/\+/g, '%2B') : url;
  }

  products = toSignal<Product[]>(
    this.route.paramMap.pipe(
      switchMap(pm => {
        this.isLoading.set(false);
        this.error.set(null);

        const cat = pm.get('name');
        const req$ = cat
          ? ProductApi.getByCategory(cat)
          : ProductApi.getProducts();

        return req$.pipe(
          tap(() => this.error.set(null)),
          catchError(err => {
            this.error.set(err?.message || 'Failed to load products');
            return of([] as Product[]);
          }),
          finalize(() => this.isLoading.set(false))
        )
      })
    ),
    { initialValue: [] as any }
  );

  // derived views
  filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    const list = this.products() ?? [];
    if (!q) return list;
    return list.filter(p => p.title.toLowerCase().includes(q));
  });

  totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filtered().length / this.pageSize()))
  );

  paged = computed(() => {
    const p = Math.min(this.page(), this.totalPages()); // clamp
    const size = this.pageSize();
    const start = (p - 1) * size;
    return this.filtered().slice(start, start + size);
  });

  // actions
  setPage(n: number) { if (n >= 1 && n <= this.totalPages()) this.page.set(n); }
  prev() { this.setPage(this.page() - 1); }
  next() { this.setPage(this.page() + 1); }

  // helpers for template bindings with ngModel
  onSearchChange(v: string) { this.search.set(v); this.page.set(1); }
  onPageSizeChange(v: string) { this.pageSize.set(+v || 9); this.page.set(1); }
}