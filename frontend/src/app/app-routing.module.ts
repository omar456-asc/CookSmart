import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeModule } from './home/home.module';
import { PaymentComponent } from './payment/payment.component';
import { OrderComponent } from './order/components/order/order.component';

import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: '', component: HomeComponent },
  {
    path: 'payment/:id',
    component: PaymentComponent,
  },
  { path: 'payment', component: PaymentComponent },
  { path: 'order', component: OrderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
