import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ResetPasswordComponent } from './auth/components/log-in/reset-password/component/reset-password.component';
import { EmailVerificationComponent } from './auth/components/sign-up/email-verification/component/email-verification.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  {path:'reset-password/:email', component: ResetPasswordComponent},
  {path:'verify/:code', component: EmailVerificationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
