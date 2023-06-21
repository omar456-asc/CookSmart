import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/log-in/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent  {
  userID:any
  constructor(private route: ActivatedRoute,
    private auth:AuthService,
    private router: Router) {
      this.userID=this.auth.getUserID()
      console.log(this.userID)
    }



  ngAfterViewInit() {
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }
  logout() {
    localStorage.removeItem('id');
    localStorage.removeItem('Token');
    this.router.navigateByUrl('/auth')
  }
}
