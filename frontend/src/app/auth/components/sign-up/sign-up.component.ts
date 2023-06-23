import { Component, EventEmitter, Output } from '@angular/core';
import { SignUpService } from '../../services/sign-up/sign-up.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  @Output() showLoginComponent = new EventEmitter();
  authUser: any;
  validationMessage: any;
  emailMsg: string = '';
  usernameMsg: string = '';
  passwordMsg: string = '';
  chefvalue=false

  constructor(private myUser: SignUpService, private router: Router) {}
  //# region registerComponent
  AddNewUser(username: any, email: any, password: any) {

    let signupUser = { username, email, password };

    this.myUser.AddNewUser(signupUser).subscribe(
      (data) => {
        this.authUser = data;
        console.log(this.authUser);
        this.showLoginComponent.emit();
      },
      (err) => {
        if (email == '') {
          this.emailMsg = 'Please enter your email';
        } else if (err.error.message.email != '') {
          this.emailMsg = err.error.message.email;
        } else {
          this.emailMsg = '';
        }

        if (username == '') {
          this.usernameMsg = 'Please enter your username';
        } else if (err.error.message.username != '') {
          this.usernameMsg = err.error.message.username;
        } else {
          this.usernameMsg = '';
        }

        if (password == '') {
          this.passwordMsg = 'Please enter your password';
        } else if (err.error.message.password == '') {
          this.passwordMsg = '';
        }
      }
    );
  }
  updateCheckboxValue() {
    this.chefvalue=true

    console.log(`Checkbox value updated to: ${this.chefvalue}`);
  }

  //#endregion
  //#region validation
  validationForm = new FormGroup({
    username: new FormControl(null, [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9]{4,16}'),
    ]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [
      Validators.minLength(6),
      Validators.required,
    ]),
    is_chef: new FormControl(null, [Validators.required]),
  });

  get Validation() {
    return this.validationForm.valid;
  }
  get isEmailValid() {
    return this.validationForm.controls['email'].valid;
  }
  get isPasswordValid() {
    return this.validationForm.controls['password'].valid;
  }
  get isUsernameValid() {
    return this.validationForm.controls['username'].valid;
  }
  //#endregion
}
