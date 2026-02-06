'use server'
import { Gettheauthtoken } from "@/utilites/getauthtoken";







export async function clearproduct(){
 const  rawToken = await Gettheauthtoken()
   if(! rawToken)
    throw new Error('unuthorized , login first')
const res = await fetch(`${process.env.API}/cart`,{
    cache:'no-store',
    method:'DELETE',
    headers: {
        'Content-Type': 'application/json',
          'token':  rawToken 
    }
});
const payload = await res.json();
return payload
}