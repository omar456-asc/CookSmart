import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeroComponent } from './components/hero/hero.component';
import { HeaderComponent } from './components/header/header.component';
import { WhyUsComponent } from './components/why-us/why-us.component';
import { TeamMemberComponent } from './components/team-member/team-member.component';
import { LatestBlogComponent } from './components/latest-blog/latest-blog.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ProductsComponent } from './components/products/products.component';
import { RecommendationComponent } from './components/recommendation/recommendation.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HomeComponent, HeroComponent, HeaderComponent, WhyUsComponent, TeamMemberComponent, LatestBlogComponent, ContactUsComponent, ContactFormComponent, FooterComponent, AboutUsComponent, ProductsComponent, RecommendationComponent],
  imports: [CommonModule,
    RouterModule],
  exports: [HomeComponent, HeroComponent,
FooterComponent,
HeaderComponent
  ],
})
export class HomeModule { }
