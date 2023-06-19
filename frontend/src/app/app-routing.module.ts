import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './about-us/about-us.component';
import { ProfileComponent } from './profile/profile.component';
import { ErrorComponent } from './shared/components/error/error.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutusComponent },
  { path: 'profile', component: ProfileComponent},
  // { path: 'profile', component: ProfileComponent, canActivate: [UserGuard] },


  { path: '**', component: ErrorComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
