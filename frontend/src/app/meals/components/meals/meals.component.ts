import { Component, OnInit } from '@angular/core';
import { AllMealsService } from '../../services/all-meals.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {
  category:string=''
  Meals:any;
  LocalStorageId:any = localStorage.getItem('id');
  filteredCategories:any;
  favorite:any;
  errorMessage: string | undefined;
  card={
    active:true
  };
  constructor(public mealService:AllMealsService){

  }
  ngOnInit(): void {

    this.mealService.GetAllMeals().subscribe(
      {
        next:(data:any)=>{
          this.Meals = data;

          console.log(this.Meals)
        },
        error:(err)=>{console.log(err)}
      }
    )
  }





  filter(event: MouseEvent,categoryy:string){
    const links = document.querySelectorAll('.suggestion-wrap a');
    links.forEach(link => link.classList.remove('active'));
    const targetElement = event.target as HTMLElement; // cast event.target to the HTMLElement type
    if (HTMLElement) { // use optional chaining to check if event.target is not null
      targetElement.classList.add('active'); // add the 'active' class to the clicked link
    }
    if(categoryy == 'Fivourite'){
      this.category=categoryy;
      this.filteredCategories= this.Meals.filter((meal:any) => this.favorite.includes(meal._id));

    }

   else if(categoryy){
    this.category=''
     this.filteredCategories = this.Meals.filter((category: any) => category.category.toLowerCase().includes(categoryy.toLowerCase()))

    }
    else{
      this.category=''
      this.filteredCategories = null
    }
  }

}
