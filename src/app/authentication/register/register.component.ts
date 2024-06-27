import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register.component.html',
  // styleUrl: './register.component.css'
})
export class RegisterComponent {
  public extraClass: string = '';
  public rounded: boolean = false;
  public border: boolean = false;
  public fluid: boolean = false;

  ngOnInit() {
    initFlowbite();
  }
}
