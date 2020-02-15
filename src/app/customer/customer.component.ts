import { Component, OnInit } from '@angular/core';

import { CustomerService } from '../shared/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private customerService: CustomerService) { }
  submitted: boolean;
  showSuccessMsg: boolean;
  formControls = this.customerService.form.controls;
  customerForm = this.customerService.form;

  ngOnInit() {
  }

   onSubmit() {
     this.submitted = true;
     if (this.customerService.form.valid) {
       if (this.customerService.form.get('$key').value == null){
        this.customerService.insertCustomer(this.customerForm.value);
       }else{
         this.customerService.updateCustomer(this.customerForm.value);
       }     
       this.showSuccessMsg = true;
       //to disp msg only for sometime
       setTimeout(() => this.showSuccessMsg = false, 3000);
       this.submitted = false;
       this.customerForm.reset();
     }
  }

}