import getdata from "@/Api/product.api"
import Singelproduct from "@/app/_component/singlrprod/Singelproduct"

export default async function BrandDetails({
  params,
}: {
  params: { brandId: string }
}) {
  const products = await getdata({ brand: params.brandId })

  return (
    <div className="flex flex-wrap">
      {products.map((p: any) => (
        <Singelproduct key={p._id} product={p} />
      ))}
    </div>
  )
}
