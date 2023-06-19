import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HomeModule } from './home/home.module';
import { AboutUsModule } from './about-us/about-us.module';
import { SharedModule } from './shared/shared.module';
import { ProfileModule } from './profile/profile.module';

@NgModule({
  declarations: [AppComponent],
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
    ProfileModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
