import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = localStorage.getItem('cart');
  private oldCartLength = this.cart ? JSON.parse(this.cart).length : 0;

  private cartCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(this.oldCartLength);
  public cartCount$ = this.cartCountSubject.asObservable();

  private cartItems: any[] = [];

  constructor() {

  }
  addToCart(item: any) {
    // this.cartItems.push(item);
    let cart = localStorage.getItem('cart');
    let oldCartLength = cart ? JSON.parse(cart).length : 0;
    console.log("on add to cart", oldCartLength);
    this.updateCartCount(oldCartLength + 1);
  }

  removeFromCart(item: any) {
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      let cart = localStorage.getItem('cart');
      let oldCartLength = cart ? JSON.parse(cart).length : 0;
      console.log("on delete to cart", oldCartLength);
      this.cartItems.splice(index, 1);
      this.updateCartCount(oldCartLength - 1);
    }
  }

  clearCart() {
    this.cartItems = [];
    this.updateCartCount();
  }

  // incrementCount() {
  //   const currentCount = this.cartItems.length;
  //   this.cartItems.push({}); // Add a dummy item
  //   this.updateCartCount(currentCount + 1);
  // }

  // decrementCount() {
  //   const currentCount = this.cartItems.length;
  //   if (currentCount > 0) {
  //     this.cartItems.pop(); // Remove the last item
  //     this.updateCartCount(currentCount - 1);
  //   }
  // }

  updateCartCount(count: number = this.cartItems.length) {


    this.cartCountSubject.next(count);

  }
}
