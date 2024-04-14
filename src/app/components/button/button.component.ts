import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() outline: boolean = false; // determines if the button is outlined
  @Output() onClick = new EventEmitter<any>(); // emits on button click

  handleClick(event: any) {
    this.onClick.emit(event);
  }
  constructor() {}
}

