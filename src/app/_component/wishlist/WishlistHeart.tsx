"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getWishlist, addToWishlist, removeFromWishlist } from "@/Api/wishlist";
import { toast } from "react-toastify";

export default function WishlistHeart({ productId }: { productId: string }) {
  const [isFav, setIsFav] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

  // Get token from session
  const getToken = () => {
    if (!session) return null;
    return (session as any)?.token;
  };

  // Check if product is in wishlist on component mount
  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (status === "authenticated") {
        const token = getToken();
        if (!token) return;

        try {
          const result = await getWishlist(token);
          if (result.status === 'success' && Array.isArray(result.data)) {
            const isInWishlist = result.data.some(
              (item: any) => item._id === productId
            );
            setIsFav(isInWishlist);
          }
        } catch (error) {
          console.error("Error checking wishlist:", error);
        }
      }
    };

    checkWishlistStatus();
  }, [session, status, productId]);

  const toggleWishlist = async () => {
    const token = getToken();
    
    if (!token) {
      toast.error("Please login to add to wishlist");
      return;
    }

    setLoading(true);

    try {
      if (isFav) {
        // Remove from wishlist
        await removeFromWishlist(productId, token);
        setIsFav(false);
        toast.success("Removed from wishlist");
      } else {
        // Add to wishlist
        await addToWishlist(productId, token);
        setIsFav(true);
        toast.success("Added to wishlist!");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-all"
      disabled={loading}
      title={isFav ? "Remove from wishlist" : "Add to wishlist"}
    >
      {loading ? (
        <span className="text-sm">...</span>
      ) : (
        <span 
          className={`text-xl ${isFav ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}
        >
          {isFav ? "❤️" : "🤍"}
        </span>
      )}
    </button>
  );
}