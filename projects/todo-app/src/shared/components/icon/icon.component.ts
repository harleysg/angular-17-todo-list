import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent implements OnChanges {
  @Input() hideIcon = false
  @Input() imgSrc = ''
  @Input() iconCode: undefined | string | SafeHtml = undefined
  @Input() iconName = 'fa-solid fa-filter'

  _iconAsHTML: SafeHtml = ''

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['iconCode'] && changes['iconCode'].currentValue) {
      this._iconAsHTML = this.sanitizer.bypassSecurityTrustHtml(this.iconCode as string)
      this.iconName = ''
    }
  }
}
