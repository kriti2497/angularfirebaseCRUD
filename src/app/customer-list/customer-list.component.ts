import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../shared/customer.service';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  constructor(private customerService: CustomerService) { }
  customerArray = [];
  showDeletedMsg: boolean;
  searchText: string = "";
  ngOnInit() {
    this.customerService.getCustomers().subscribe(list =>{
      this.customerArray = list.map(item => {
        return {
          // we will convert an observable to array to display in our list
          $key: item.key,
          // ..item.payload.val() will return the value in customers node without key value
          ...item.payload.val()
        };
      });
    });
  }

 //customerService.populateCustomerData(cust)
  //populate data
  populateData(customer){
    this.customerService.populateCustomerData(customer);
  }

  //on delete asking for a prompt whether u really want to delete
  onDelete($key){
    if(confirm('Are you sure to delete this record?')){
      this.customerService.deleteCustomer($key);
      this.showDeletedMsg = true;
      setTimeout(() => this.showDeletedMsg = false, 3000);
    }
  }
  //filter by full name
  filterCustomerDetails(customer){
    return customer.fullName.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
  }

}
