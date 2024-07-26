import { Component } from '@angular/core';
import { MyOrderDetails } from '../../models/order.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {


  displayedColumns = ["Name", "Address", "Contact No.", "Amount", "Status"];

  myOrderDetails: MyOrderDetails[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails() {
    this.productService.getMyOrders().subscribe(
      (resp: MyOrderDetails[]) => {
        console.log(resp);
        this.myOrderDetails = resp;
      }, (err)=> {
        console.log(err);
      }
    );
  }

}
