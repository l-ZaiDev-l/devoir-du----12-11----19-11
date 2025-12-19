// src/app/pages/checkout/step1-summary.component.ts
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, first } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartItem, Coupon } from '../../../state/cart/cart.model';
import { selectCartItems, selectCartTotal, selectCartDiscount } from '../../../state/cart/cart.selectors';
import { applyCoupon, removeCoupon } from '../../../state/cart/cart.actions';
import { PageWrapperComponent } from '../../../shared/components/UI/page-wrappe/page-wrapper.component';

@Component({
  selector: 'app-step1-summary',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    PageWrapperComponent
  ],
  template: `
<app-page-wrapper>
  <h2 class="text-3xl font-bold text-gray-800 mb-6">🛒 Order Summary</h2>

  <!-- Cart items -->
  <div *ngIf="cartItems$ | async as items; else emptyCart" class="space-y-6">

    <div *ngFor="let item of items" class="flex flex-col sm:flex-row justify-between items-center p-4 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 bg-white">
      
      <!-- Item Info -->
      <div class="flex items-center gap-4 w-full sm:w-2/3">
        <div class="w-24 h-24 rounded-lg overflow-hidden shadow-sm">
          <img [src]="item.imageUrl" alt="{{ item.name }}" class="object-cover w-full h-full"/>
        </div>
        <div class="flex flex-col justify-center space-y-1">
          <p class="font-semibold text-gray-700 line-clamp-2">{{ item.name }}</p>
          <p class="text-gray-500">Quantity: {{ item.quantity }}</p>
          <p *ngIf="item.stock !== undefined" class="text-sm"
             [ngClass]="{
               'text-green-600': item.stock > (item.lowStockThreshold || 0),
               'text-orange-600': item.stock > 0 && item.stock <= (item.lowStockThreshold || 0),
               'text-red-600': item.stock === 0
             }">
            {{ item.stock === 0 ? 'Out of stock' :
               item.stock <= (item.lowStockThreshold || 0) ? 'Only ' + item.stock + ' left' : 'In stock' }}
          </p>
        </div>
      </div>

      <!-- Price -->
      <div class="mt-3 sm:mt-0 sm:text-right w-full sm:w-1/3 font-bold text-gray-800 text-lg">
        {{ item.price * item.quantity | currency:'EUR' }}
      </div>

    </div>

    <!-- Totals -->
    <div class="mt-6 p-4 bg-gray-50 rounded-xl shadow-inner space-y-2 text-right">
      <div class="text-gray-700">Subtotal: {{ cartTotal$ | async | currency:'EUR' }}</div>
      <div class="text-gray-500">Discount: {{ cartDiscount$ | async | currency:'EUR' }}</div>
      <div class="text-gray-700">Delivery: {{ getDeliveryPrice() | currency:'EUR' }}</div>
      <div class="text-xl text-blue-600 font-bold">
        Grand Total: {{
          ((cartTotal$ | async)! - (cartDiscount$ | async)! + getDeliveryPrice())
          | currency:'EUR'
        }}
      </div>
    </div>

    <!-- Proceed Button -->
    <div class="flex justify-end mt-6">
      <button class="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl shadow-md hover:bg-blue-700 hover:scale-105 transition transform"
              (click)="next()">
        Proceed to Shipping
      </button>
    </div>

  </div>

  <!-- Empty Cart -->
  <ng-template #emptyCart>
    <div class="text-center py-16">
      <p class="text-gray-400 text-lg italic">Your cart is currently empty. Add some products to continue! 🛍️</p>
    </div>
  </ng-template>
</app-page-wrapper>

  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Step1SummaryComponent {
  private store = inject(Store);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  cartItems$: Observable<CartItem[]> = this.store.select(selectCartItems);
  cartTotal$: Observable<number> = this.store.select(selectCartTotal);
  cartDiscount$: Observable<number> = this.store.select(selectCartDiscount);

  couponForm: FormGroup = this.fb.group({
    code: ['', Validators.required]
  });

  // Delivery options form
  deliveryForm: FormGroup = this.fb.group({
    method: ['standard', Validators.required]
  });

  // List of delivery choices
  deliveryOptions = [
    { value: 'standard', label: 'Standard Delivery (3–5 days)', price: 4.99 },
    { value: 'express', label: 'Express Delivery (1–2 days)', price: 9.99 },
    { value: 'pickup', label: 'Store Pickup', price: 0 },
  ];

  // Flag to indicate free shipping coupon applied
  freeShippingApplied = false;

  getDeliveryPrice(): number {
    // if free shipping coupon applied, always 0
    if (this.freeShippingApplied) {
      return 0;
    }
    const selected = this.deliveryForm.value.method;
    return this.deliveryOptions.find(o => o.value === selected)?.price || 0;
  }

  next() {
    this.router.navigate(['/shop/checkout/address'], {
      queryParams: { delivery: this.deliveryForm.value.method, freeShipping: this.freeShippingApplied }
    });
  }

  applyCouponCode() {
    if (!this.couponForm.valid) {
      this.couponForm.controls['code'].markAsTouched();
      return;
    }

    const code = this.couponForm.value.code.trim().toUpperCase();
    let coupon: Coupon | null = null;

    if (code === 'WELCOME10') {
      coupon = { code, discountPercent: 10 };
      // ensure freeShipping flag reset if a non-freeship coupon is applied
      this.freeShippingApplied = false;
      this.store.dispatch(applyCoupon({ coupon }));
      this.snackBar.open('Coupon WELCOME10 applied! 10% off 🎉', 'Close', { duration: 3000 });

    } else if (code === 'FREESHIP') {
      // set a local flag to zero the delivery price
      this.freeShippingApplied = true;

      // dispatch a coupon if you want it in state as well (optional)
      coupon = { code, discountPercent: 0 };
      this.store.dispatch(applyCoupon({ coupon }));

      this.snackBar.open('Free shipping applied! 🚚', 'Close', { duration: 3000 });

    } else if (code === 'VIP20') {
      // take current total once
      this.cartTotal$.pipe(first()).subscribe(total => {
        if (total >= 100) {
          coupon = { code, discountPercent: 20 };
          // reset freeShipping if previously applied (business decision)
          this.freeShippingApplied = false;
          this.store.dispatch(applyCoupon({ coupon }));
          this.snackBar.open('VIP20 applied! 20% off 🎉', 'Close', { duration: 3000 });
        } else {
          this.snackBar.open('VIP20 requires a minimum order of 100€ ❌', 'Close', { duration: 3000 });
        }
      });
    } else {
      // Unknown code
      this.snackBar.open('Invalid coupon code ❌', 'Close', { duration: 3000 });
    }

    // If coupon was created (WELCOME10, FREESHIP or VIP20 succeeded), dispatch it (VIP20 already dispatched inside)
    if (coupon && coupon.code !== 'VIP20') {
      // VIP20 already dispatched above when conditions met
      this.store.dispatch(applyCoupon({ coupon }));
    }

    // reset form input
    this.couponForm.reset();
  }

  trackById(index: number, item: any): number {
    return item.id; // clé unique pour chaque produit
  }

  removeCouponCode() {
    // remove coupon from store and reset freeShipping flag
    this.freeShippingApplied = false;
    this.store.dispatch(removeCoupon());
    this.snackBar.open('Coupon removed 🗑️', 'Close', { duration: 3000 });
  }
}
