import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoComponent, SalutComponent } from './pages';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TodoComponent,
    SalutComponent,
    LayoutComponent
  ],
  exports: [
    TodoComponent,
    SalutComponent,
    LayoutComponent
  ]
})
export class SharedModule { }
