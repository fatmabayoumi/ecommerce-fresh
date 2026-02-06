'use server'
import { Gettheauthtoken } from "@/utilites/getauthtoken";







export async function deleteproduct(productId:string){
 const  rawToken = await Gettheauthtoken()
   if(! rawToken)
    throw new Error('unuthorized , login first')
const res = await fetch(`${process.env.API}/cart/${productId}`,{
    cache:'no-store',
    method:'DELETE',
    headers: {
        'Content-Type': 'application/json',
          'token':  rawToken 
    },
    body:JSON.stringify({productId})
});
const payload = await res.json();
return payload
}