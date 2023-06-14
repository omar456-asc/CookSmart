import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeroComponent } from './components/hero/hero.component';
import { HeaderComponent } from './components/header/header.component';
import { WhyUsComponent } from './components/why-us/why-us.component';
import { TeamMemberComponent } from './components/team-member/team-member.component';

@NgModule({
  declarations: [HomeComponent, HeroComponent, HeaderComponent, WhyUsComponent, TeamMemberComponent],
  imports: [CommonModule],
  exports: [HomeComponent, HeroComponent],
})
export class HomeModule {}
