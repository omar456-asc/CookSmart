import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  OnInit,
} from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartData, ChartOptions } from 'chart.js';
import { AuthService } from './../../../auth/services/log-in/auth.service';
import { LogInService } from './../../../auth/services/log-in/log-in.service';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/order/service/order.service';
import { UserdashboardServiceService } from '../../services/userdashboard-service.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements AfterViewInit, OnInit {
  @ViewChild('worldwideSalesCanvas') worldwideSalesCanvas!: ElementRef;
  @ViewChild('salesRevenueCanvas') salesRevenueCanvas!: ElementRef;
  ID: any = localStorage.getItem('id');
  orders: any;
  category: any;
  totalPrice: any;
  totalPriceValues: any;
  totalOrdersPrice: any;
  totalCategory: any;
  rate: any;
  allRates: any;
  highestRate: any;
  highestRateCategory: any;
  data: any;
  orderDetails: any;
  options: any;
  data1: any;
  data2: any;
  type2: any;
  type1: any;
usersOrders: any;
  //
  ingredients: any;
  summary: any;
is_chef: boolean=false;

  constructor(
    myRoute: ActivatedRoute,
    public UserdashboardServiceService: UserdashboardServiceService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router,

  ) {
  this.is_chef=this.authService.getRole()
  this.totalPrice = 0.0;
  this.orders = [];
  this.totalPriceValues = [];
  this.totalCategory = [];
  this.totalOrdersPrice = 0.0;
  this.allRates = [];
  this.highestRate = 0;
  this.highestRateCategory = '';
  this.orderDetails = [];

}
  ngOnInit(): void {
    if(this.is_chef){
      this.getAllOrder()
    }else{
    this.UserdashboardServiceService.getOrdersByUserId(this.ID).subscribe({
      next: (data: any) => {
        this.data = data;
        console.log(this.data);

        for (let i = 0; i < data.orders.length; i++) {
          for (let j = 0; j < data.orders[i].meals.length; j++) {
            let meal = data.orders[i].meals[j];

            this.rate = parseFloat(meal.rate);
            this.category = meal.category;
            //
            this.ingredients = meal.ingredients;
            this.summary = meal.summary;
            if (this.rate > this.highestRate) {
              this.highestRate = this.rate;
              this.highestRateCategory = this.category;
            }
          }
          console.log(this.orders);
          this.orders.push(`Order ${i + 1}`);
          this.totalPriceValues.push(this.totalPrice);
          this.totalCategory.push(this.category);
          this.orderDetails.push({
            orderId: data.orders[i].order._id,
            status: data.orders[i].order.status,
            totalPrice: data.orders[i].order.totalPrice,
          });
          this.totalPrice += parseFloat(this.orderDetails[i].totalPrice);
          this.allRates.push(this.rate);
        }

        this.totalOrdersPrice += this.totalPrice;
        //Bar Chart
        this.type2 = 'line';
        this.type1 = 'bar';
        this.data1 = {
          labels: this.orders,
          datasets: [
            {
              label: 'total price per order',
              data: this.totalPriceValues,
              backgroundColor: ['black'],
            },
          ],
        };
        this.data2 = {
          labels: this.totalCategory,
          datasets: [
            {
              label: 'category per rate',
              data: this.allRates,
              backgroundColor: ['#d4af37'],
            },
          ],
        };
        this.options = {
          maintainAspectRatio: true,
          responsive: true,
          // maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        };
      },
      error: (err) => {
        console.log(err);
      },
    });
  }}
  ngAfterViewInit() {
    const worldwideSalesCanvas = this.worldwideSalesCanvas.nativeElement;
    const salesRevenueCanvas = this.salesRevenueCanvas.nativeElement;

    const worldwideSalesData = {
      labels: this.orders,
      datasets: [
        {
          label: 'total price per order',
          data: this.totalPriceValues,
          backgroundColor: ['#2e394d'],
        },
      ],
    };

    const salesRevenueData = {
      labels: this.totalCategory,
      datasets: [
        {
          label: 'Category Per Rate',
          data: this.allRates,
          backgroundColor: '#990000',
          fill: true,
        },
      ],
    };

    const worldwideSalesChart = new Chart(worldwideSalesCanvas, {
      type: 'bar',
      data: worldwideSalesData,
      options: {
        responsive: true,
      },
    });

    const salesRevenueChart = new Chart(salesRevenueCanvas, {
      type: 'line',
      data: salesRevenueData,
      options: {
        responsive: true,
      },
    });
  }

  getStatusClass(status: string): string {
    if (status === 'pending') {
      return 'badge badge-warning';
    } else if (status === 'confirmed') {
      return 'badge badge-success';
    } else if (status === 'rejected') {
      return 'badge badge-danger';
    } else if (status === 'cancelled') {
      return 'badge badge-secondary';
    } else if (status === 'payed') {
      return 'badge badge-primary';
    }
    return 'badge ';
  }

  updateOrderStatus(id: any, status: any) {
    this.orderService.updateOrderStatus(id, status).subscribe(
      () => {
        this.ngOnInit();
        if (status === 'cancelled') {
          location.reload();
        }
      },
      (err) => {
        console.log(err);
      }
    );
    console.log(id, status);
  }
  getAllOrder(){
    this.orderService.getAllOrders().subscribe(
      (data:any) => {
        this.usersOrders=data
        console.log(this.usersOrders);
        }
      ,
      (err) => {
        console.log(err);
      }
    );
}
}










