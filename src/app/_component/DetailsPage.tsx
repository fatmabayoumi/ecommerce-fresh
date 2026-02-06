import React from 'react'
import ProductItemBtn from '../products/_component/productitemBtn'

export default function DetailsPage({ data }: { data: any[] }) {
  return (
    <div className="container w-[60%] p-4 mx-auto">
      {data.map((product) => (
        <div key={product._id} className="flex">
          {/* LEFT */}
          <div className="w-1/4 p-4">
            <img
              src={product.imageCover}
              alt="details item"
            />
          </div>

          {/* RIGHT */}
          <div className="w-3/4 p-4">
            <h1 className="text-2xl font-bold my-4">
              {product.title}
            </h1>

            <p>{product.description}</p>

            <p className="text-emerald-500 my-4">
              {product.category.name}
            </p>

            <div className="flex w-full justify-between my-4">
              <span>{product.price} EGP</span>
              <span>
                {product.ratingsAverage}
                <i className="text-yellow-500">★</i>
              </span>
            </div>

            <ProductItemBtn id={product._id} />
          </div>
        </div>
      ))}
    </div>
  )
}
