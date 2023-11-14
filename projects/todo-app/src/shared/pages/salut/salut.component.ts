import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandComponent } from '@shared/components';

@Component({
  selector: 'app-salut',
  standalone: true,
  imports: [CommonModule, BrandComponent],
  templateUrl: './salut.component.html',
  styleUrl: './salut.component.scss'
})
export class SalutComponent {
  title = 'todo-app';
}
