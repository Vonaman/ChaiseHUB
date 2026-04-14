export interface Chair {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  category: string;
  fullDescription: string;
  features: string[];
  specs: Record<string, string>;
  reviews: number;
}