interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface BrandResponse {
  status: string;
  results?: number;
  data: Brand[];
}

interface SingleBrandResponse {
  status: string;
  data: Brand;
}

export async function getBrands(): Promise<Brand[]> {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands", {
      next: { revalidate: 3600 },
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch brands: ${res.status}`);
    }
    
    const { data }: BrandResponse = await res.json();
    return data || [];
  } catch (error) {
    console.error('Error in getBrands:', error);
    return [];
  }
}

export async function getBrandById(id: string): Promise<Brand | null> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
      {
        next: { revalidate: 3600 },
      }
    );
    
    if (!res.ok) {
      throw new Error(`Failed to fetch brand: ${res.status}`);
    }
    
    const { data }: SingleBrandResponse = await res.json();
    return data || null;
  } catch (error) {
    console.error('Error in getBrandById:', error);
    return null;
  }
}