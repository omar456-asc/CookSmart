import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/config.service';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  private readonly Base_URL: string;

  constructor(
    private readonly myClient: HttpClient,
    private readonly configService: ConfigService
  ) {
    this.Base_URL = this.configService.getBaseUrl('reset');
  }

  resetpw(newPw: any,email: string) {
    return this.myClient.post(this.Base_URL + '/reset-password/'+email, newPw);
  }
  sendresetemail(email:any){
    return this.myClient.post(this.Base_URL + '/email-reset-password',email);
  }
}
