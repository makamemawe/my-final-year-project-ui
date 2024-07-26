import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {

  displayedColumns: string[] = ['Id', 'Product Name', 'Name', 'Address', 'Contact No.', 'Status', 'Action'];

  dataSource: any[] = [];

  status: string = 'All';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllOrderDetailsForAdmin(this.status);
  }

  getAllOrderDetailsForAdmin(statusParameter: string) {
    this.productService.getAllOrderDetailsForAdmin(statusParameter).subscribe(
      (res) => {
        this.dataSource = res;
        console.log(res);
      }, (error) => {
        console.log(error);
      }
    );
  }

  markAsDelivered(orderId: any) {
    console.log(orderId);
    this.productService.markAsDelivered(orderId).subscribe(
      (res) => {
        this.getAllOrderDetailsForAdmin(this.status);
        console.log(res);
      }, (error) => {
        console.log(error);
      }
    );
  }

}
