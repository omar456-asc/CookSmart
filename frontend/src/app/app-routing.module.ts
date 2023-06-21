import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeModule } from './home/home.module';

import { HomeComponent } from './home/home.component';
import { HeroComponent } from './home/components/hero/hero.component';
import { AboutusComponent } from './about-us/about-us.component';
import { ErrorComponent } from './shared/components/error/error.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
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
  { path: '', component: HomeComponent },
  { path: 'user', component: UserdashboardComponent },
  { path: 'about', component: AboutusComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
