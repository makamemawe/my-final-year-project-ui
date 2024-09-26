import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MyOrderDetails } from '../../models/order.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {


  displayedColumns = ["Name", "Address", "Contact No.", "Amount", "Status", "Action"];

  myOrderDetails: MyOrderDetails[] = [];


  status: string = 'All';

  selectedStatus: string = "";


  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {

   }

  ngOnInit(): void {
    this.getOrderDetails(this.status);

  }

  getOrderDetails(statusParameter: string) {
    this.productService.getMyOrders().subscribe(
      (res: MyOrderDetails[]) => {
        console.log(res);
        this.myOrderDetails = res;
      }, (err)=> {
        console.log(err);
      }
    );
  }

  sendOrders(orderId: any) {
    console.log(orderId);
    this.productService.markAsDelivered(orderId).subscribe(
      (res) => {
        this.getOrderDetails(this.status);
        console.log(res);
      }, (error) => {
        console.log(error);
      }
    );
   }


   deleteOrder(orderId: string): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.productService.deleteOrder(orderId).subscribe({
        next: () => {
          this.snackBar.open('Order deleted successfully', 'Close', { duration: 3000 });
          this.myOrderDetails = this.myOrderDetails.filter(order => order.id !== orderId);
        },
        error: (err) => {
          console.error('Error deleting order:', err);
          this.snackBar.open('Failed to delete order', 'Close', { duration: 3000 });
        }
      });
    }
  }


}
