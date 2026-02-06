"use client"

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { getWishlist, removeFromWishlist } from "@/Api/wishlist"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'react-toastify'
import ProductItemBtn from '@/app/products/_component/productitemBtn'
import WishlistHeart from '@/app/_component/wishlist/WishlistHeart'

export default function WishlistPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [wishlist, setWishlist] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchWishlist = async () => {
      if (status === 'unauthenticated') {
        router.push('/auth/login')
        return
      }

      if (status === 'authenticated' && session) {
        setLoading(true)
        try {
          const token = (session as any)?.token
          
          if (!token) {
            setError('No authentication token found')
            return
          }

          const result = await getWishlist(token)
          
          if (result.status === 'success') {
            setWishlist(result.data || [])
          } else {
            setError(result.message || 'Failed to load wishlist')
          }
        } catch (err: any) {
          setError(err.message || 'Something went wrong')
        } finally {
          setLoading(false)
        }
      }
    }

    fetchWishlist()
  }, [session, status, router])

  // Handle remove from wishlist
  const handleRemoveFromWishlist = async (productId: string, productName: string) => {
    const token = (session as any)?.token
    if (!token) {
      toast.error('Please login to modify wishlist')
      return
    }

    if (confirm(`Remove "${productName}" from wishlist?`)) {
      try {
        const result = await removeFromWishlist(productId, token)
        if (result.status === 'success') {
          // Update local state
          setWishlist(prev => prev.filter(item => item._id !== productId))
          toast.success('Removed from wishlist')
        } else {
          toast.error(result.message || 'Failed to remove')
        }
      } catch (error: any) {
        toast.error(error.message || 'Failed to remove')
      }
    }
  }

  // Custom Product Card for Wishlist (Full width)
  const WishlistProductCard = ({ product }: { product: any }) => {
    return (
      <div className="w-full bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 mb-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Image Section */}
          <div className="lg:w-1/4">
            <Link href={`/products/${product._id}`}>
              <div className="relative h-64 lg:h-48 w-full overflow-hidden rounded-lg">
                <img 
                  src={product.imageCover} 
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
          </div>
          
          {/* Details Section */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <Link href={`/products/${product._id}`}>
                  <h2 className="text-xl font-bold text-gray-900 hover:text-emerald-600 transition-colors mb-2">
                    {product.title}
                  </h2>
                </Link>
                
                <div className="flex items-center gap-4 mb-3">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                    {product.category?.name || "Category"}
                  </span>
                  
                  <div className="flex items-center">
                    <span className="text-yellow-500 text-lg mr-1">★</span>
                    <span className="font-bold">{product.ratingsAverage || 0}</span>
                    <span className="text-gray-500 text-sm ml-1">({product.ratingsQuantity || 0})</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {product.description || "No description available"}
                </p>
                
                {/* Price */}
                <div className="mb-4">
                  {product.priceAfterDiscount ? (
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-emerald-600">
                        {product.priceAfterDiscount} EGP
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        {product.price} EGP
                      </span>
                      <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-bold rounded">
                        Save {product.price - product.priceAfterDiscount} EGP
                      </span>
                    </div>
                  ) : (
                    <span className="text-2xl font-bold text-gray-900">
                      {product.price} EGP
                    </span>
                  )}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col items-center gap-3 ml-4">
                <WishlistHeart productId={product._id} />
                
                <button
                  onClick={() => handleRemoveFromWishlist(product._id, product.title)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1 hover:bg-red-50 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
            
            {/* Bottom Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <div className="text-sm text-gray-500">
                <span className="font-medium">Stock:</span> {product.quantity || 0} available
              </div>
              
              <div className="flex gap-3">
                {/* Use the same ProductItemBtn as home page */}
                <ProductItemBtn id={product._id} />
                
                <Link
                  href={`/products/${product._id}`}
                  className="border border-gray-300 hover:border-emerald-600 text-gray-700 hover:text-emerald-600 font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Loading state
  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading your wishlist...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold mb-4">Wishlist Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link 
            href="/products" 
            className="inline-block bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  // Empty wishlist
  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-gray-400 text-5xl mb-4">🤍</div>
          <h1 className="text-2xl font-bold mb-4">Your Wishlist is Empty</h1>
          <p className="text-gray-600 mb-6">
            You haven't added any products to your wishlist yet. Start exploring!
          </p>
          <Link 
            href="/products" 
            className="inline-block bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  // Display wishlist with full-width cards
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <p className="text-gray-600 mt-2">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} in your wishlist
          </p>
        </div>
        
        {/* Full width cards */}
        <div className="space-y-6">
          {wishlist.map((product: any) => (
            <WishlistProductCard key={product._id} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link 
            href="/products" 
            className="inline-block border border-emerald-600 text-emerald-600 px-6 py-2 rounded-lg hover:bg-emerald-50 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}