
export interface MyOrderDetails {
  id: string;
  // orderId: number;
  // orderFullName: string;
  // orderFullOrder: string;
  // orderContactNumber: string;
  // orderAlternateContactNumber: string;
  // orderStatus: string;
  // orderAmount: number;
  // product: Product;
  // user: any;
  orderId: number;
  product: {
    productName: string;
  };
  user: {
    userFirstName: string;
  };
  orderFullOrder: string;
  orderContactNumber: string;
  totalAmount: number;
  orderDate: Date;
  orderStatus: string;

}
