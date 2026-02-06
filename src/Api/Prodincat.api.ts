import { Product } from "@/types/product";
interface ProductResponse {
  status: string;
  results?: number;
  data: Product[];
}
export default async function Prodincat(catid: string): Promise<Product[]> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?category[in]=${catid}`,
      {
        next: { revalidate: 3600 },
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch category products: ${response.status}`);
    }
    
    const { data }: ProductResponse = await response.json();
    return data || [];
  } catch (error) {
    console.error('Error in Prodincat:', error);
    return [];
  }
}