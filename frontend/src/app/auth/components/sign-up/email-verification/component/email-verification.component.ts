import { Component, OnInit } from '@angular/core';
import { EmailverificationService } from '../service/emailverification.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  constructor(private route: ActivatedRoute,public verifyService: EmailverificationService){

  }
  ngOnInit(): void {
var verificationCode=this.route.snapshot.params['code'];
    this.verifyService.verification(verificationCode).subscribe(
      {
        next:(data:any)=>{
          console.log(data);
        },
        error:(err)=>{console.log(err)}
      }
    )
  }
}
