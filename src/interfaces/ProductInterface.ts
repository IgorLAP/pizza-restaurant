export interface Extras {
  text: string;
  price: number;
}
export interface ProductInterface {
  _id: string;
  title: string;
  desc: string;
  img: string;
  prices: number[];
  extraOptions?: Extras[]
}