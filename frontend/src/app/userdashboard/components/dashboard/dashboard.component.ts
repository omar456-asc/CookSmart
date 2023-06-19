// import { Component } from '@angular/core';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartData, ChartOptions } from 'chart.js';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('worldwideSalesCanvas') worldwideSalesCanvas!: ElementRef;
  @ViewChild('salesRevenueCanvas') salesRevenueCanvas!: ElementRef;

  ngAfterViewInit() {
    const worldwideSalesCanvas = this.worldwideSalesCanvas.nativeElement;
    const salesRevenueCanvas = this.salesRevenueCanvas.nativeElement;

    const worldwideSalesData = {
      labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022'],
      datasets: [
        {
          label: 'USA',
          data: [15, 30, 55, 65, 60, 80, 95],
          backgroundColor: 'rgba(0, 156, 255, .7)',
        },
        {
          label: 'UK',
          data: [8, 35, 40, 60, 70, 55, 75],
          backgroundColor: 'rgba(0, 156, 255, .5)',
        },
        {
          label: 'AU',
          data: [12, 25, 45, 55, 65, 70, 60],
          backgroundColor: 'rgba(0, 156, 255, .3)',
        },
      ],
    };

    const salesRevenueData = {
      labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022'],
      datasets: [
        {
          label: 'Sales',
          data: [15, 30, 55, 45, 70, 65, 85],
          backgroundColor: 'rgba(0, 156, 255, .5)',
          fill: true,
        },
        {
          label: 'Revenue',
          data: [99, 135, 170, 130, 190, 180, 270],
          backgroundColor: 'rgba(0, 156, 255, .3)',
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
