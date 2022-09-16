export type TCurrentItems = {
  items: TItem[];
  pageCount: number;
  status: 'error' | 'loading' | 'successful';
};

export type TItem = {
  id: string;
  name: string;
  cost: number;
  sale: number;
  rating: number;
  category: string;
  featured: string;
  items: [{ color: string; photos: string[] }];
  reviews: [{ name: string; title: string; text: string; date: number; stars: number }];
};

export type TFilterSlice = {
  category: string[];
  featured: string[];
  minPrice: number;
  maxPrice: number;
  sort: string;
  currentPage: number;
};

export type TFetchItems = {
  category: string[];
  featured: string[];
  minPrice: number;
  maxPrice: number;
  sort: string;
  currentPage: number;
};

export type TCartSlice = {
  totalPrice: number;
  totalCount: number;
  shipping: number;
  items: TCartItem[];
};

export type TCartItem = {
  cartid: string;
  count: number;
} & TItem;
