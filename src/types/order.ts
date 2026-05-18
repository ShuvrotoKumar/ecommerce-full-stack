export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  status: string;
  createdAt: string;
  totalAmount: number;
  orderItems: OrderItem[];
}
