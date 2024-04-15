import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShippingService } from '../../../Service/Shipping/shipping.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-shipment',
  templateUrl: './update-shipment.component.html',
  styleUrl: './update-shipment.component.css'
})
export class UpdateShipmentComponent {
  
  formVailde : boolean = true ;
  projectForm! : FormGroup;
  pType:any;
  getControl(name: string): FormControl {
    return this.projectForm.get(name) as FormControl;
  }

  constructor(protected shippingService:ShippingService,
    private router:Router
  ){ }
  ngOnInit() {
    // console.log(this.productService.productObject.category)
    this.projectForm = new FormGroup({
      'shipping_place': new FormControl(this.shippingService.ShipmentObject.shipping_place, [
        Validators.required,
      ]),
      'shipping_price': new FormControl(this.shippingService.ShipmentObject.shipping_costs, [
        Validators.required,
      ]),
      'note': new FormControl(this.shippingService.ShipmentObject.note),
      "shipping_id":new FormControl(this.shippingService.ShipmentObject.shipping_id, [
        Validators.required,
      ]),
    });

    this.getRegionsList()

  }

  get shipping_place() { return this.projectForm.get('shipping_place'); }
  get shipping_price() { return this.projectForm.get('shipping_price'); }
  get note() { return this.projectForm.get('note'); }
  get shipping_id() { return this.projectForm.get('shipping_id'); }
  onSaveProject(){
    console.log(this.projectForm.value)
  if(this.projectForm.valid){
    
  const data={
    'shipping_place': this.projectForm.value.shipping_place,
  'shipping_price': this.projectForm.value.shipping_price,
  'note': this.projectForm.value.note,
   'shipping_id': this.projectForm.value.shipping_id
  }
    this.formVailde = true;
    this.shippingService.updateShipment(data).subscribe(
      (res: any) => {
       console.log(res);
        this.onDestroyForm()
       },
      (error: any) => {
       console.log(error.error.error);
       },
       );;
  }
  else this.formVailde =false;
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
  onDestroyForm(){
    this.projectForm.reset()
    this.router.navigate(['/shipments'])
  }

}
