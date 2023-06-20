import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HomeModule } from './home/home.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // HomeModule,
    // OrderModule,
    PaymentModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
