export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  images?: string[];
  category: {
    _id: string;
    name: string;
    slug: string;
    image?: string;
  };
  brand?: {
    _id: string;
    name: string;
    slug: string;
    image?: string;
  };
  ratingsAverage: number;
  ratingsQuantity: number;
  quantity: number;
  sold?: number;
  createdAt: string;
  updatedAt: string;
  slug: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface ApiResponse<T> {
  status: string;
  message?: string;
  results?: number;
  data: T;
}

export interface Pagination {
  currentPage: number;
  limit: number;
  numberOfPages: number;
  next?: number;
  prev?: number;
}