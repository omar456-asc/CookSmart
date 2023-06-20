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

@NgModule({
  declarations: [AppComponent,MealsComponent,MealDetailsComponent],
  imports: [BrowserModule,
     AppRoutingModule,
     AuthModule ,
     FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
