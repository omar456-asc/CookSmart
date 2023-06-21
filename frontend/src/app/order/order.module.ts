import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './components/order/order.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../home/components/header/header.component';
import { FooterComponent } from '../home/components/footer/footer.component';

@NgModule({
  declarations: [OrderComponent, HeaderComponent, FooterComponent],
  imports: [CommonModule, RouterModule],
  exports: [OrderComponent, HeaderComponent, FooterComponent],
})
export class OrderModule {}
