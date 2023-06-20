import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';

@NgModule({
  declarations: [PaymentFormComponent, PaymentComponent],

  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [PaymentFormComponent, PaymentComponent],
})
export class PaymentModule {}
