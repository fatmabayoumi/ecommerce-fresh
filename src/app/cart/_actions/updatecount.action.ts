'use server'
import { Gettheauthtoken } from "@/utilites/getauthtoken";







export async function updateproduct({productId,count}:{productId:string,count:number}){
 const  rawToken = await Gettheauthtoken()
   if(! rawToken)
    throw new Error('unuthorized , login first')
const res = await fetch(`${process.env.API}/cart/${productId}`,{
    cache:'no-store',
    method:'PUT',
    headers: {
        'Content-Type': 'application/json',
          'token':  rawToken 
    },
    body:JSON.stringify({count})
});
const payload = await res.json();
return payload
}