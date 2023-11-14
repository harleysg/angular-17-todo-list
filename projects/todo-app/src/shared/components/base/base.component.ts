import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-base',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: '',
  styleUrl: './base.component.scss'
})
export class BaseComponent {
  constructor(cd: ChangeDetectorRef) { }
}
