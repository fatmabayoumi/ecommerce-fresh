interface Product {
  id:string;
  _id: string;
  title: string;
  description: string;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  category: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  brand?: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  ratingsAverage: number;
  quantity: number;
}

interface ProductResponse {
  status: string;
  results?: number;
  data: Product[];
}

interface SingleProductResponse {
  status: string;
  data: Product;
}

export default async function getdata(params?: { brand: string }): Promise<Product[]> {
  try {
    let url = 'https://ecommerce.routemisr.com/api/v1/products';
    
 
    if (params?.brand) {
      url += `?brand=${params.brand}`;
    }
    
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    
    const { data }: ProductResponse = await response.json();
    return data || [];
  } catch (error) {
    console.error('Error in getdata:', error);
    return [];
  }
}
