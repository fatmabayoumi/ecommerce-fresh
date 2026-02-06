import React from 'react'
import ChekOut from '../_components/ChekOut'


export default async function page({ params,}: {  params: Promise<{ id: string }>})
 {
    const data =await params
  return (
    <div>
      <ChekOut cartId={data?.id}></ChekOut>
    </div>
  )
}
