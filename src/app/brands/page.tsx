import { getBrands } from "@/Api/brands"
import Link from "next/link"

export default async function BrandsPage() {
  const brands = await getBrands()

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
      {brands.map((brand: any) => (
        <Link key={brand._id} href={`/brands/${brand._id}`}>
          <img src={brand.image} />
          <p>{brand.name}</p>
        </Link>
      ))}
    </div>
  )
}
