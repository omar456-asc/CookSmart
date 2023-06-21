import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MealsComponent } from './meals/components/meals/meals.component';
import { MealDetailsComponent } from './meals/components/meal-details/meal-details.component';

import { HomeModule } from './home/home.module';
import { AboutUsModule } from './about-us/about-us.module';
import { SharedModule } from './shared/shared.module';
import { UserdashboardModule } from './userdashboard/userdashboard.module';
import { CheckoutModule } from './checkout/checkout.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';

@NgModule({

  declarations: [AppComponent,MealsComponent,MealDetailsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HomeModule,
    SharedModule,
    AboutUsModule,
    UserdashboardModule,
    RouterModule,
    CheckoutModule,
    PaymentModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
