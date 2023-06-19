import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserdashboardComponent } from './userdashboard.component';

@NgModule({
  declarations: [UserdashboardComponent, DashboardComponent],
  imports: [CommonModule],
  exports: [UserdashboardComponent, DashboardComponent],
})
export class UserdashboardModule {}
