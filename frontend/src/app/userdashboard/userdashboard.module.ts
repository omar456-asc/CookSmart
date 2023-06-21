import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserdashboardComponent } from './userdashboard.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [UserdashboardComponent, DashboardComponent],
  imports: [CommonModule, SharedModule],
  exports: [UserdashboardComponent, DashboardComponent],
})
export class UserdashboardModule {}
