import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css',
})
export class TextInputComponent {
  @Input() control!: FormControl; // Instead of controlName
  @Input() placeholder: any;
  @Input() type: string = 'text';
}
