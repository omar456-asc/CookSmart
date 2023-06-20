import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeroComponent } from './components/hero/hero.component';
import { WhyUsComponent } from './components/why-us/why-us.component';
import { TeamMemberComponent } from './components/team-member/team-member.component';
import { LatestBlogComponent } from './components/latest-blog/latest-blog.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
// import { AboutUsComponent } from './components/about-us/about-us.component';
import { ProductsComponent } from './components/products/products.component';
import { RecommendationComponent } from './components/recommendation/recommendation.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    HeroComponent,
    WhyUsComponent,
    TeamMemberComponent,
    LatestBlogComponent,
    ContactUsComponent,
    ContactFormComponent,
    ProductsComponent,
    RecommendationComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [HomeComponent, HeroComponent],
})
export class HomeModule {}
