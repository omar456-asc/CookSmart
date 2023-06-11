import { Component } from '@angular/core';
import { ResetPasswordService } from '../service/reset-password.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
constructor(private reset:ResetPasswordService,
  private route: ActivatedRoute){

}

  ResetPassword( password: any) {
    const email=this.route.snapshot.params['email']
        let newpw = {password};
        console.log(newpw);
        this.reset.resetpw(newpw,email).subscribe((response: any) => {
          console.log(response);
        },
        (err) => {
          console.log(err);
      })
}}
