'use client';

import {  useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { CartRes, Product } from '../typrscript/cart.type';
import Loading from '@/app/_component/Loading';

import imagcart from '../../../assets/images/modern-design-concept-no-product-found-cart-design_637684-219.avif'

import Image from 'next/image';
import { deleteproduct } from '../_actions/deleteitem.action';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { clearproduct } from '../_actions/clearitem.action';
import { updateproduct } from '../_actions/updatecount.action';
import Link from 'next/link';

export default function Cart() {
   
    
  

const{isLoading,isError,error,data} = useQuery<CartRes>({queryKey:['cart'],
    queryFn:async()=>{
    const res= await fetch(`/api/cart`);
    const payload = await res.json()
    return payload
}})
if(isLoading)
    return <Loading/>
    if(isError)
        return<h2>{error.message}</h2>
       if(data?.numOfCartItems === 0) {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <img 
        alt='cartempty' 
        src={imagcart.src}
        className='max-w-md w-full' 
      />
    </div>
  );
}
  const quiryclient=useQueryClient()
     const{mutate,isPending}=useMutation({mutationFn:clearproduct,
      onSuccess:(data)=>{
        toast.success(data?.message)
        quiryclient.invalidateQueries({queryKey:['cart']})
      },
      onError:()=>{
        toast.error('login first')
      }
    })
   

          

  return (
    <div className='py-5'>
        <h2>Total Cart Price:<span className='text-main font-bold'>{data?.data.totalCartPrice}EGp</span></h2>
         <h3>Numb of Cart items:<span className='text-main font-bold'>{data?.numOfCartItems}</span></h3>
<div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
  <table className="w-full text-sm text-left rtl:text-right text-body">
    <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Product
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Qty
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Price
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
     {data?.data.products.map(prod=> <Itemstableproduct key={prod._id} prod={prod}></Itemstableproduct>
)}
    </tbody>
  </table>
</div>
<Button className='block ml-auto my-5 cursor-pointer' onClick={()=>mutate()} > {isPending?<i className="fa-solid fa-spin fa-spinner"></i>:"Clear Cart"}</Button>
<Button className='block ml-auto my-2 cursor-pointer' >
  <Link href={`/CheckOut/${data?.cartId}`}>check OUT </Link>
</Button>
</div>
  )
}






export function Itemstableproduct({prod}:{prod:Product}){
  const quiryclient=useQueryClient()
    const{mutate,isPending,data}=useMutation({mutationFn:deleteproduct,
      onSuccess:(data)=>{
        toast.success(data?.message)
        quiryclient.invalidateQueries({queryKey:['cart']})
      },
      onError:()=>{
        toast.error('login first')
      }
    })
    const {mutate:MutateUpdate,isPending:ispendingupdate}=useMutation({mutationFn:updateproduct,
      onSuccess:(data)=>{
        toast.success(data?.message)
        quiryclient.invalidateQueries({queryKey:['cart']})
      },
      onError:()=>{
        toast.error('login first')
      }
    })
    console.log(data)
function handleupdate(){
    prod.count<prod.product.quantity ? MutateUpdate({productId:prod.product._id ,count:prod.count+1}):"Not available"
}
   
    return(
    
         <tr className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium">
        <td className="p-4">
          <img width={100} height={100} src={prod.product.imageCover} className="size-[100px] object-cover" alt="item image" />
        </td>
        <td className="px-6 py-4 font-semibold text-heading">
          {prod.product.title}
          {prod.product.quantity}
        </td>
        <td className="px-6 py-4">
       <div className="flex items-center">
  <button onClick={()=>MutateUpdate({productId:prod.product._id ,count:prod.count-1})} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
    <span className="sr-only">Quantity button</span>
    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
    </svg>
  </button>
  <div className='flex items-center justify-center'>
    <span id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  >{ispendingupdate?<i className="fa-solid fa-spin fa-spinner"></i>:prod.count}</span>
  </div>
  <button onClick={handleupdate} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
    <span className="sr-only">Quantity button</span>
    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
    </svg>
  </button>
</div>
</td>
        <td className="px-6 py-4 font-semibold text-heading">
        {prod.price}EGP
        </td>
        <td className="px-6 py-4">
           <span onClick={()=>mutate(prod.product._id)}  className="font-medium text-red-600 dark:text-red-500 hover:underline">
        {isPending?<i className="fa-solid fa-spin fa-spinner"></i>:<i className='cursor-pointer fa-solid fa-trash text-red-500'></i>}  
          </span>
        </td>
      </tr>
    )
}


