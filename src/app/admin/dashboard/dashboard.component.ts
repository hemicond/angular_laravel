import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { components } from '../../common/components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  components = components.filter((component) => !!component.card);
  public url: string = '';
  constructor(private router: Router) {
    this.url = this.router.url;
    console.log(this.url);
  }
}
