import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../services/product.service';


  @Component({
    selector: 'app-order-details',
    templateUrl: './order-details.component.html',
    styleUrl: './order-details.component.css'
  })
  export class OrderDetailsComponent implements OnInit {

    displayedColumns: string[] = ['Id', 'Product Name', 'Name', 'Address', 'Contact No.', 'Order Date', 'Status', 'Action'];

    dataSource: any[] = [];

    status: string = 'All';

    selectedStatus: string = "";
    date = new Date();


    constructor(
      private productService: ProductService,
      private snackBar: MatSnackBar
    ) { }

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

    sendOrders(orderId: any) {
      console.log(orderId);
      this.productService.updateDelivery(orderId).subscribe(
        (res) => {
          this.getAllOrderDetailsForAdmin(this.status);
          console.log(res);
        }, (error) => {
          console.log(error);
        }
      );
    }

    getTotalProducts(): number {
      return this.dataSource.reduce((sum, order) => sum + order.product.productQuantity, 0);
    }

    // loadOrders(): void {
    //   this.productService.getMyOrders().subscribe((data: DataSource[]) => {
    //     this.d = data;
    //   });
    // }

    // refreshOrders(): void {
    //   this.loadOrders();
    // }

    deleteOrder(orderId: string): void {
      if (confirm('Are you sure you want to delete this order?')) {
        this.productService.deleteOrder(orderId).subscribe({
          next: () => {
            this.snackBar.open('Order deleted successfully', 'Close', { duration: 3000 });
            // this.refreshOrders();
          },
          error: (err) => {
            console.error('Error deleting order:', err);
            this.snackBar.open('Failed to delete order', 'Close', { duration: 3000 });
          }
        });
      }
    }

  };

