import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { AboutusComponent } from './about-us.component';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [AboutusComponent, AboutComponent],
  imports: [SharedModule],
  exports: [AboutusComponent, AboutComponent],
})
export class AboutUsModule { }
