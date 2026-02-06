interface WishlistItem {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  category: {
    _id: string;
    name: string;
  };
}

interface WishlistResponse {
  status: string;
  message?: string;
  count?: number;
  data: WishlistItem[];
}

/**
 * GET wishlist - Get user's wishlist
 */
export async function getWishlist(token: string | null): Promise<WishlistResponse> {
  // No token = not logged in
  if (!token) {
    return {
      status: 'unauthenticated',
      message: 'Please login to view wishlist',
      data: []
    };
  }

  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        method: 'GET',
        headers: { 
          'token': token,
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      }
    );
    
    // Handle response
    if (!res.ok) {
      if (res.status === 401) {
        return {
          status: 'unauthenticated',
          message: 'Please login again',
          data: []
        };
      }
      
      if (res.status === 500) {
        return {
          status: 'server_error',
          message: 'Server error',
          data: []
        };
      }
      
      return {
        status: 'error',
        message: `Error ${res.status}`,
        data: []
      };
    }
    
    const data = await res.json();
    return data;
    
  } catch (error: any) {
    console.error('Fetch error in getWishlist:', error);
    
    // Network error
    if (error.name === 'TypeError') {
      return {
        status: 'network_error',
        message: 'Network error. Check your connection.',
        data: []
      };
    }
    
    return {
      status: 'unknown_error',
      message: 'Something went wrong',
      data: []
    };
  }
}

/**
 * ADD to wishlist - Add product to wishlist
 */
export async function addToWishlist(productId: string, token: string | null): Promise<any> {
  if (!token) {
    throw new Error('Please login first');
  }

  if (!productId) {
    throw new Error('Product ID is required');
  }

  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'token': token,
        },
        body: JSON.stringify({ productId }),
      }
    );
    
    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(data.message || `Error ${res.status}`);
    }
    
    return data;
    
  } catch (error: any) {
    console.error('Error in addToWishlist:', error);
    
    if (error.name === 'TypeError') {
      throw new Error('Network error. Please check your connection.');
    }
    
    throw error;
  }
}

/**
 * REMOVE from wishlist - Remove product from wishlist
 */
export async function removeFromWishlist(productId: string, token: string | null): Promise<any> {
  if (!token) {
    throw new Error('Please login first');
  }

  if (!productId) {
    throw new Error('Product ID is required');
  }

  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        method: "DELETE",
        headers: { 
          'token': token,
          'Content-Type': 'application/json'
        },
      }
    );
    
    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(data.message || `Error ${res.status}`);
    }
    
    return data;
    
  } catch (error: any) {
    console.error('Error in removeFromWishlist:', error);
    
    if (error.name === 'TypeError') {
      throw new Error('Network error. Please check your connection.');
    }
    
    throw error;
  }
}

/**
 * CHECK if product is in wishlist
 */
export async function checkProductInWishlist(productId: string, token: string | null): Promise<boolean> {
  if (!token) return false;
  
  try {
    const { status, data } = await getWishlist(token);
    return status === 'success' && Array.isArray(data) && data.some(item => item._id === productId);
  } catch {
    return false;
  }
}