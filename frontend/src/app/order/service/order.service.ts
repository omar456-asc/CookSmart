import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/config.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly Base_URL: string;

  constructor(
    private readonly HttpClient: HttpClient,
    private readonly configService: ConfigService
  ) {
    this.Base_URL = this.configService.getBaseUrl('orders');
  }
  getAllOrders() {
    return this.HttpClient.get(this.Base_URL);
  }
  CreateOrder(newOrder: any) {
    return this.HttpClient.post(this.Base_URL, newOrder);
  }
  updateOrderStatus(id: any, status: string) {
    const body = { status };

    return this.HttpClient.put(`${this.Base_URL}/${id}`, body);
  }
  getOrderByID(id: any) {
    return this.HttpClient.get(this.Base_URL + '/' + id);
  }
}
