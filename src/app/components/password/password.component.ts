import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrl: './password.component.css',
})
export class PasswordComponent {
  @Input() control!: FormControl; // Instead of controlName
  @Input() placeholder: any;
  @Input() type: string = 'password';
  passwordVisible: boolean = false;

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    this.type = this.passwordVisible ? 'text' : 'password';
  }
}
