import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/config.service';

@Injectable({
  providedIn: 'root'
})
export class EmailverificationService {

  private readonly Base_URL: string;

  constructor(
    private readonly myClient: HttpClient,
    private readonly configService: ConfigService
  ) {
    this.Base_URL = this.configService.getBaseUrl('users');
  }

  verification(verificationCode:any) {
    return this.myClient.get(this.Base_URL +'/verify/'+verificationCode);
  }

}
