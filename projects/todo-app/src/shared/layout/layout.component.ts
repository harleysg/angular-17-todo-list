import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

import { MENU } from '@core/constant/routes.contants';
import { BrandComponent } from '@shared/components';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, BrandComponent],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  routes: { label: string, link: string }[] = []

  constructor() {
    this.routes = Object.values(MENU)
  }
}
