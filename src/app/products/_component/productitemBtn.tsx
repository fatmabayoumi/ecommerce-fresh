'use client'

import { addproduct } from '@/app/cart/_actions/addProduct'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'react-toastify'

export default function ProductItemBtn({id}:{id:string}) {
  const quiryclient=useQueryClient()
    const{mutate,isPending,data}=useMutation({mutationFn:addproduct,
      onSuccess:(data)=>{
        toast.success(data?.message)
        quiryclient.invalidateQueries({queryKey:['cart']})
      },
      onError:()=>{
        toast.error('login first')
      }
    })
    console.log(data)
  return (
   <Button onClick={()=>mutate(id)} className='my-4 w-full cursor-pointer'>{isPending?<i className="fa-solid fa-spin fa-spinner"></i>:"Add to cart"}</Button>
  )
  
}
