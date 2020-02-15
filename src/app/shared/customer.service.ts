import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private firebase: AngularFireDatabase) { }

  customerList: AngularFireList<any>;

  form = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    location: new FormControl('')
  });

  //fn for retrieving all custs that we have saved in FireBase project
  getCustomers() {
    this.customerList = this.firebase.list('customers');
    //customerList is of type AngularFirelist and to work with it we need an observable
    return this.customerList.snapshotChanges();
  }

  //insert a new customer
  insertCustomer(customer){
    this.customerList.push({
      fullName: customer.fullName,
      email: customer.email,
      mobile: customer.mobile,
      location: customer.location
    });
  }
  //to populate all data for edit/update
  populateCustomerData(customer){
    this.form.setValue(customer);
  }

  //to edit/update data
  updateCustomer(customer){
    //to update fn pass two values, one is key, second is the updated values
    this.customerList.update(customer.$key, {
      fullName: customer.fullName,
      email: customer.email,
      mobile: customer.mobile,
      location: customer.location
    });
  }

  // to delete customer data
  deleteCustomer($key: string){
    this.customerList.remove($key);
  }
}
