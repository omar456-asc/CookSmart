import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  signup = true;
  login=false
    filter(event: MouseEvent,type:string){
      const links = document.querySelectorAll('div button');
  links.forEach(link => link.classList.remove('active'));
  const targetElement = event.target as HTMLElement; // cast event.target to the HTMLElement type
  if (HTMLElement) { // use optional chaining to check if event.target is not null
    targetElement.classList.add('active'); // add the 'active' class to the clicked link
  }
  if(type === 'signup'){
    this.signup=true;
    this.login=false;
  }
  if(type === 'login'){
    this.signup=false;
    this.login=true;
  }

    }
}
