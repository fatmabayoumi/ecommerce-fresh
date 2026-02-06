import { Product } from "@/types/product";

interface SingleProductResponse {
  status: string;
  data: Product;
}
export default async function deatils(params: { id: string }): Promise<Product | null> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${params.id}`,
      {
        next: { revalidate: 3600 },
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch product details: ${response.status}`);
    }
    
    const { data }: SingleProductResponse = await response.json();
    return data || null;
  } catch (error) {
    console.error('Error in deatils:', error);
    return null;
  }
}