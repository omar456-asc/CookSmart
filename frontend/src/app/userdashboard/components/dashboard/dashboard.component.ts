
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartData, ChartOptions } from 'chart.js';
import { AuthService } from './../../../auth/services/log-in/auth.service';
import { LogInService } from './../../../auth/services/log-in/log-in.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements AfterViewInit {
is_chef:boolean=false;
  constructor(
    private myService: LogInService,
    private authService: AuthService,
    private router: Router,
  ) {
  this.is_chef=this.authService.getRole()

  }


  @ViewChild('worldwideSalesCanvas') worldwideSalesCanvas!: ElementRef;
  @ViewChild('salesRevenueCanvas') salesRevenueCanvas!: ElementRef;

  ngAfterViewInit() {
    const worldwideSalesCanvas = this.worldwideSalesCanvas.nativeElement;
    const salesRevenueCanvas = this.salesRevenueCanvas.nativeElement;

    const worldwideSalesData = {
      labels: [
        'order1',
        'order2',
        'order3',
        'order4',
        'order5',
        'order6',
        'order7',
      ],
      datasets: [
        {
          label: 'Total Price Per Orader',
          data: [200, 150, 600, 755, 400, 399, 1000],
          backgroundColor: '#2e394d',
        },
      ],
    };

    const salesRevenueData = {
      labels: [
        'Pizza-category',
        'Pasta-category',
        'Fish-category',
        'Pizza-category',
        'Pizza-category',
        'Pizza-category',
        'Pizza-category',
      ],
      datasets: [
        {
          label: 'Category Per Rate',
          data: [3.0, 2.5, 4, 2, 3.5, 4, 4],
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
}









