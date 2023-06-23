import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeModule } from './home/home.module';
import { PaymentComponent } from './payment/payment.component';
import { OrderComponent } from './order/components/order/order.component';

import { HomeComponent } from './home/home.component';
import { HeroComponent } from './home/components/hero/hero.component';
import { AboutusComponent } from './about-us/about-us.component';
import { ProfileComponent } from './profile/profile.component';
import { ErrorComponent } from './shared/components/error/error.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { ResetPasswordComponent } from './auth/components/log-in/reset-password/component/reset-password.component';
import { EmailVerificationComponent } from './auth/components/sign-up/email-verification/component/email-verification.component';
import { MealsComponent } from './meals/components/meals/meals.component';
import { MealDetailsComponent } from './meals/components/meal-details/meal-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AddMealComponent } from './meals/components/add-meal/add-meal.component';
import { CustomizeMealComponent } from './checkout/components/customize-meal/customize-meal.component';
import { ShowOrderComponent } from './order/components/show-order/show-order.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { ChefGuard } from './auth/guards/chef.guard';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path:'reset-password/:email', component: ResetPasswordComponent},
  { path:'verify/:code', component: EmailVerificationComponent},
  { path: 'meals', component: MealsComponent },
  { path: 'mealdetails/:id', component: MealDetailsComponent ,canActivate: [ChefGuard]},
  { path: '', component: HomeComponent },
  { path: 'user', component: UserdashboardComponent },
  { path: 'about', component: AboutusComponent },
  { path: 'cart', component: CheckoutComponent, canActivate: [AuthGuard,ChefGuard]},
  { path:'add-meal',component:AddMealComponent, canActivate: [AuthGuard]},
  { path: 'customize/:id', component: CustomizeMealComponent, canActivate: [AuthGuard,ChefGuard]},
  {
    path: 'payment/:id',
    component: PaymentComponent, canActivate: [AuthGuard]
  },
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard,ChefGuard] },
  { path: 'order', component: OrderComponent, canActivate: [AuthGuard,ChefGuard] },
  {path:'order/:id',component:ShowOrderComponent, canActivate: [AuthGuard,ChefGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  // { path: 'profile', component: ProfileComponent, canActivate: [UserGuard] },


  { path: '**', component: ErrorComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
