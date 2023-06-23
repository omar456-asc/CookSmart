import { Component, OnInit } from '@angular/core';
import { LogInService } from '../../services/log-in/log-in.service';
import { AuthService } from '../../services/log-in/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetPasswordService } from './reset-password/service/reset-password.service';
import { AllMealsService } from 'src/app/meals/services/all-meals.service';
import { CartService } from 'src/app/shared/services/cart.service';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent {
  isRegistred: boolean = false;
  emailMsg: string = '';
  passwordMsg: string = '';
  resetpw:string='';
  validationForm = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  get isEmailValid() {
    return this.validationForm.controls['email'].valid;
  }
  get isPasswordValid() {
    return this.validationForm.controls['password'].valid;
  }
  // add() {
  //   if (!this.validationForm.valid) {
  //   }
  // }

  constructor(
    private myService: LogInService,
    private authService: AuthService,
    private router: Router,
    private reset: ResetPasswordService,
    private usercart: AllMealsService,
    private cartService: CartService
    // private shared: SharedService
  ) {}
  cart: any;
  Login(email: any, password: any) {
    let logInUser = { email, password };
    this.myService.LOGIN(logInUser).subscribe((response: any) => {

      if(response.isVerified==false){
        this.passwordMsg = 'Please verify your email first, check your email';
      }else{
        this.authService.setToken(response.token);
      this.authService.setUserID(response.id);
      this.router.navigateByUrl('');
      }

      this.getcart();
      // this.cartService.updateCartCount()
      // this.checkRole();
    },
    (err) => {
      if (email == '') {
        this.emailMsg = 'please enter your email';
      } else if (err.error.message.email != '') {
        this.emailMsg = err.error.message.email;
      } else {
        this.emailMsg = '';
      }
      if (password == '') {
        this.passwordMsg = 'Please enter your password';
      } else if (err.error.message.password == '') {
        this.passwordMsg = '';
      } else {
        this.passwordMsg = 'Incorrect password , please try again';
      }
    }
    );
  }
  sendEmail(email:any){
    if(email){
      this.resetpw="check your email, password reset link sent"
      console.log(this.resetpw)
    let resetemail = { email };
    this.reset.sendresetemail(resetemail).subscribe((response: any) => {
     console.log(response);
    },
    (err) => {
      console.log(err)
     if(err.error.message =='User not found'){
      this.emailMsg='this email isn\'t registered'
     }
    }
    );}
    else{
      this.emailMsg = 'please enter your email';
    }
  }

  getcart() {
    var id = this.authService.getUserID();

    this.myService.GetUserCart(id).subscribe({
      next: (data: any) => {
        this.cart = data.cart;
        if (this.cart) {
          this.cartService.updateCartCount(this.cart.length);
          this.cartService.cartCount$.subscribe((count) => {
            this.cart.length = count;
          });
          if(this.cart[0]){
          this.usercart.setCart(JSON.stringify(this.cart));
        }}
        else{
          var length =0;
          this.cartService.updateCartCount(this.cart.length);
          this.cartService.cartCount$.subscribe((count) => {
            length = count;
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  // checkRole() {
  //   let isAdmin = this.authService.getRole();
  //   if (isAdmin === true) {
  //     this.router.navigate(['/admin']);
  //   } else if (isAdmin === false) {
  //     this.router.navigate(['/']);
  //   } else {
  //     this.router.navigate(['/login']);
  //   }
  // }
}
