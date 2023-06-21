import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './components/log-in/reset-password/component/reset-password.component';
import { EmailVerificationComponent } from './components/sign-up/email-verification/component/email-verification.component';



@NgModule({
  declarations: [
    AuthComponent,
    LogInComponent,
    SignUpComponent,
    ResetPasswordComponent,
    EmailVerificationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
   exports: [
    AuthComponent,
    LogInComponent,
    SignUpComponent
  ]
})
export class AuthModule { }
