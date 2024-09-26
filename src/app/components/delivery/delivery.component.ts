import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.css'
})
export class DeliveryComponent {

  displayedColumns = ["Name", "Address", "Contact No.", 'Order Date', "Status",];

  dataSource: any[] = [];


  status: string = 'All';

  selectedStatus: string = "";


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

}
