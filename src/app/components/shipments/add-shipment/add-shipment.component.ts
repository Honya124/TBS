import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from '../../../app.component';
import { Router } from '@angular/router';
import { PublicService } from '../../../Service/public.service';
import { ShippingService } from '../../../Service/Shipping/shipping.service';

@Component({
  selector: 'app-add-shipment',
  templateUrl: './add-shipment.component.html',
  styleUrl: './add-shipment.component.css'
})
export class AddShipmentComponent {

  
  
  form!: FormGroup;
  getControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }
  constructor(
    public appComponent: AppComponent,
    private fb: FormBuilder,
    private router: Router,
    public publicService: PublicService,
    public shippingService: ShippingService
  ) {}
  ngOnInit(): void {
  this.form = this.fb.group({
    shipping_place: ['', [Validators.required]],
    shipping_price: ['', [Validators.required]],
    note: [''],
    
  });

  this.getRegionsList()
}


data: any;
onSubmit() {
  this.data = {
    shipping_place: this.form.value.shipping_place,
    shipping_price: this.form.value.shipping_price,
    note: this.form.value.note,
  };

  this.shippingService.addShipment(this.data).subscribe(
    (res: any) => {
      alert('created successfully');
       this.removeFormData()
    },
    (error) => {
      alert(error.error.detail);
    }
  );
}

  regions: any;
  getRegionsList() {
    this.shippingService.getRegions().subscribe(
      (data: any) => {
      
       
        this.regions = data['iraq_province'];
        console.log(this.regions);
      },
      (error) => {
        console.error('Error fetching data: ', error);
        // alert(error.error.detail);
      }
    );
  }

  removeFormData(){
    this.form.reset()
  }

}
