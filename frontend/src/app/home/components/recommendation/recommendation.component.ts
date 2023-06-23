import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/log-in/auth.service';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css'],
})
export class RecommendationComponent {
  ID = this.authService.getUserID();
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
}
