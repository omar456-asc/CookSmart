import { Component } from '@angular/core';
import { SignUpService } from '../../services/sign-up/sign-up.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  authUser:any;
  validationMessage: any;

  constructor(private myUser:SignUpService, private router: Router){  }
  //# region registerComponent
  AddNewUser(username:any, email:any, password:any){
    let signupUser = { username, email, password};
    this.myUser.AddNewUser(signupUser).subscribe(
      (data)=>{
        this.authUser=data;
        console.log(this.authUser);
          this.router.navigateByUrl('/login');
      },
      (err)=>{
        if(err.error.message.username != ''){
          if(err.error.message.username == 'Path `username` is required.'){
            this.validationMessage = 'Please enter a username'
          }
          else{
            // this.validationMessage = 'First name must be longer than 3 letters'
          }
        }
        else if(err.error.message.email != ''){ //
          this.validationMessage = err.error.message.email;
        }
        else if(err.error.message.password != ''){ //
            this.validationMessage = err.error.message.password;
        }


      }

    )}
//#endregion
//#region validation
validationForm = new FormGroup({
  username: new FormControl(null, [Validators.required,Validators.pattern('[a-zA-Z0-9]{4,16}')]),
  email: new FormControl(null,[Validators.email,Validators.required]),
  password: new FormControl(null,[Validators.minLength(6),Validators.required])
})

get Validation(){
  return this.validationForm.valid;
}
//#endregion
}
