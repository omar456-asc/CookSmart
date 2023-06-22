import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { AddMealComponent } from './meals/components/add-meal/add-meal.component';
import { AuthService } from './auth/services/log-in/auth.service';
import { TokenInterceptor } from './auth/services/log-in/Token Interceptor/TokenInterceptor';
import { ConfigService } from './config.service';
import { ProfileModule } from './profile/profile.module';


@NgModule({

  declarations: [AppComponent,MealsComponent,MealDetailsComponent, AddMealComponent],
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
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    ConfigService,
    ProfileModule
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
