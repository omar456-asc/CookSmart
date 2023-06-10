import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AuthComponent,
    LogInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,

  ],
   exports: [
    AuthComponent,
    LogInComponent,
    SignUpComponent
  ]
})
export class AuthModule { }
