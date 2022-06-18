import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Shared Components Module
import { SharedComponentsModule } from '../components/shared-components.module';

// Layouts
import { MainLayoutComponent } from './main-layout/main-layout.component';

const layouts = [
  MainLayoutComponent,
]

@NgModule({
  declarations: [
    ...layouts,
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
  ],
  exports: [
    ...layouts,
  ]
})
export class LayoutsModule { }
