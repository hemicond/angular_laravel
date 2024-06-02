import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { SidebarService } from '../../../common/services';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [CommonModule],
})
export class SidebarComponent {
  @Input() extraClass = '';
  @Input() rounded = false;

  constructor(readonly sidebarService: SidebarService) {}
}
