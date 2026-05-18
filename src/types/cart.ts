export interface CartItem {
  productId: string;
  _id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  product?: {
    name: string;
    price: number;
    images: { url: string }[];
  };
}
