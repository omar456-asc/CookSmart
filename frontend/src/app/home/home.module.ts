import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeroComponent } from './components/hero/hero.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [HomeComponent, HeroComponent, HeaderComponent],
  imports: [CommonModule],
  exports: [HomeComponent, HeroComponent],
})
export class HomeModule {}
