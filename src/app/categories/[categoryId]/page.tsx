import Prodincat from "@/Api/Prodincat.api"
import Singelproduct from "@/app/_component/singlrprod/Singelproduct"

export default async function CategoryDetails({
  params,
}: {
  params: { categoryId: string }
}) {
  const products = await Prodincat(params.categoryId)

  return (
    <div className="flex flex-wrap">
      {products.map((p: any) => (
        <Singelproduct key={p._id} product={p} />
      ))}
    </div>
  )
}
