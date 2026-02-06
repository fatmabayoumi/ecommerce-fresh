import deatils from '@/Api/deatils'
import Prodincat from '@/Api/Prodincat.api'
import DetailsPage from '@/app/_component/DetailsPage'
import Singelproduct from '@/app/_component/singlrprod/Singelproduct'
import React from 'react'

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string[] }>
}) {
  const { id } = await params
console.log(id,'here is the data of id')
  const productId = id[0]
  const categoryId = id[1]

  const product = await deatils({ id: productId })
  const categories = await Prodincat(categoryId)

  if (!product || !categories) {
    return <div>Product not found</div>
  }

  return (
    <>
    
      <DetailsPage data={[product]} />

      <h2 className="my-5 text-xl font-bold">Related products</h2>

      <div className="flex flex-wrap">
        {categories.map((currentproduct: any) => (
          <Singelproduct
            product={currentproduct}
            key={currentproduct._id}
          />
        ))}
      </div>
    </>
  )
}
