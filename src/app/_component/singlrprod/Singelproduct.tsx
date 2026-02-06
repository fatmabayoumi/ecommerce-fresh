import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProductItemBtn from "../../products/_component/productitemBtn";
import WishlistHeart from "../wishlist/WishlistHeart";

export default function Singelproduct({ product }: { product: any }) {
  return (
    <div className="w-full md:w-1/2 lg:w-1/4 xl:w-1/5 p-4">
      <div className="relative">

        {/* ❤️ WISHLIST HEART */}
        <WishlistHeart productId={product._id} />

        <Card className="p-0">
          <Link href={`/products/${product._id}/${product.category._id}`}>
            <CardHeader>
              <CardTitle>
                <img src={product.imageCover} alt={product.title} />
              </CardTitle>
              <CardDescription className="text-emerald-500 line-clamp-1">
                {product.category.name}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <p className="line-clamp-1">{product.title}</p>
            </CardContent>

            <CardFooter>
              <div className="flex w-full justify-between">
                <span className={product.priceAfterDiscount ? "line-through" : ""}>
                  {product.price} EGP
                </span>
                {product.priceAfterDiscount && (
                  <span>{product.priceAfterDiscount} EGP</span>
                )}
                <span>
                  {product.ratingsAverage}
                  <i className="text-yellow-500">★</i>
                </span>
              </div>
            </CardFooter>
          </Link>

          <ProductItemBtn id={product._id} />
        </Card>
      </div>
    </div>
  );
}
