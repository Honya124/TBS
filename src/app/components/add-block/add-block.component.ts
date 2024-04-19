import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from './../../Service/Data/data.service';
import { NgZone } from '@angular/core';
import { ButtonDataService } from '../../Service/Button-Data/button-data.service';

@Component({
  selector: 'app-add-block',
  templateUrl: './add-block.component.html',
  styleUrl: './add-block.component.css'
})
export class AddBlockComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      code: ['', [Validators.required]]
    });
  }

  onSubmit() {
    const code = this.form.get('code')?.value;
    this.dataService.setData(code); // Send data to DataService
    this.router.navigate(['/dashboard']); // Navigate to dashboard page here
  }

}
