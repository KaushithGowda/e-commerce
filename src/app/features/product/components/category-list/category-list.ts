import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { of, tap, catchError, finalize, switchMap } from 'rxjs';
import { ProductApi } from '../../services/product';

@Component({
  selector: 'app-category-list',
  standalone: false,
  templateUrl: './category-list.html',
  styleUrls: ['./category-list.scss']
})

export class CategoryList {
  isLoading = signal(true);
  error = signal<string | null>(null);

  iconFor(c: string): string {
    const k = c.toLowerCase();
    if (k.includes('elect')) return '📱';
    if (k.includes('jewel')) return '💍';
    if (k.includes("women")) return '👗';
    if (k.includes("men")) return '👔';
    return '🛍️';
  }

  categories = toSignal<string[]>(
    ProductApi.getCategories().pipe(
      tap(() => this.error.set(null)),
      catchError(err => {
        this.error.set(err?.message || 'Failed to load categories');
        return of([] as string[]);
      }),
      finalize(() => this.isLoading.set(false))
    ),
    { initialValue: [] as any }
  );
}