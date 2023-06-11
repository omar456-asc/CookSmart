import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ResetPasswordComponent } from './auth/components/log-in/reset-password/component/reset-password.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  {path:'reset-password/:email', component: ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
