import { Component, OnInit } from '@angular/core';
import { AllMealsService } from 'src/app/meals/services/all-meals.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  Meals:any;
  constructor(public mealService:AllMealsService,

    ){

  }
  ngOnInit(): void {
    this.mealService.latest8products().subscribe(
      {
        next:(data:any)=>{
          this.Meals = data;

          console.log(this.Meals)
        },
        error:(err)=>{console.log(err)}
      }
    )
  }

}
