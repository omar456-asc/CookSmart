import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public cartCount$ = this.cartCountSubject.asObservable();

  private cartItems: any[] = [];

  constructor() { }

  addToCart(item: any) {
    this.cartItems.push(item);
    this.updateCartCount();
  }

  removeFromCart(item: any) {
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.updateCartCount();
    }
  }

  clearCart() {
    this.cartItems = [];
    this.updateCartCount();
  }

  incrementCount() {
    const currentCount = this.cartItems.length;
    this.cartItems.push({}); // Add a dummy item
    this.updateCartCount(currentCount + 1);
  }

  decrementCount() {
    const currentCount = this.cartItems.length;
    if (currentCount > 0) {
      this.cartItems.pop(); // Remove the last item
      this.updateCartCount(currentCount - 1);
    }
  }

  private updateCartCount(count: number = this.cartItems.length) {
    this.cartCountSubject.next(count);
  }
}
