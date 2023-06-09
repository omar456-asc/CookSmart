import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/log-in/auth.service';
import { Router } from '@angular/router';
import { AllMealsService } from 'src/app/meals/services/all-meals.service';
import { ShoppingCartService } from 'src/app/checkout/service/shopping-cart.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  cartid: any;
  userID: any;
  cartCount: any;
  isLoggedIn: any;
  getRole: any;
  ID = this.authService.getUserID();
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private mealService: AllMealsService,
    private cart: ShoppingCartService,
    private cartService: CartService
  ) {
    this.userID = this.authService.getUserID();
    console.log(this.userID);
    console.log(this.authService.isUserLoggedIn());
    this.isLoggedIn = this.authService.isUserLoggedIn();
    this.getRole = this.authService.getRole();
  }

  ngOnInit() {
    this.cartService.cartCount$.subscribe((count) => {
      this.cartCount = count;
    });
  }

  ngAfterViewInit() {
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }
  logout() {
    var cart: any = this.mealService.getCart();

    if (cart) {
      this.cartid = JSON.parse(cart);
    } else {
      this.cartid = [];
    }
    this.cart.AddToUserCart(this.cartid, this.ID).subscribe(
      (data: any) => {
        console.log('done');
      },
      (err) => {
        console.log(err);
      }
    );
    localStorage.removeItem('id');
    localStorage.removeItem('Token');

    localStorage.removeItem('cart');
    this.router.navigateByUrl('/auth');
  }
}
