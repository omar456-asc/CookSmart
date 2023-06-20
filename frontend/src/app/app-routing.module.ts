import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ResetPasswordComponent } from './auth/components/log-in/reset-password/component/reset-password.component';
import { EmailVerificationComponent } from './auth/components/sign-up/email-verification/component/email-verification.component';
import { MealsComponent } from './meals/components/meals/meals.component';
import { MealDetailsComponent } from './meals/components/meal-details/meal-details.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  {path:'reset-password/:email', component: ResetPasswordComponent},
  {path:'verify/:code', component: EmailVerificationComponent},
  { path: 'meals', component: MealsComponent },
  { path: 'mealdetails/:id', component: MealDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
