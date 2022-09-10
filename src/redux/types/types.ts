export type TCurrentItems = {
  items: TItem[];
  status: 'error' | 'loading' | 'successful';
};

export type TItem = {
  id: string;
  name: string;
  cost: number;
  sale: number;
  items: [{ color: string; photos: string[] }];
  reviews: [{ name: string; title: string; text: string; date: number; stars: number }];
};

export type TFilterSlice = {
  category: string[];
  featured: string[];
  minPrice: number;
  maxPrice: number;
  sort: string;
};
