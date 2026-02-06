interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface CategoryResponse {
  status: string;
  results?: number;
  data: Category[];
}

interface SingleCategoryResponse {
  status: string;
  data: Category;
}

export default async function ALLcategories(): Promise<Category[]> {
  try {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/categories", {
      next: { revalidate: 3600 },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }
    
    const { data }: CategoryResponse = await response.json();
    return data || [];
  } catch (error) {
    console.error('Error in ALLcategories:', error);
    return [];
  }
}

export async function getCategoryById(id: string): Promise<Category | null> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
      {
        next: { revalidate: 3600 },
      }
    );
    
    if (!res.ok) {
      throw new Error(`Failed to fetch category: ${res.status}`);
    }
    
    const { data }: SingleCategoryResponse = await res.json();
    return data || null;
  } catch (error) {
    console.error('Error in getCategoryById:', error);
    return null;
  }
}