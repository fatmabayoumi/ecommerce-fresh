'use client';

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { addressScheme, addressSchemeForm } from "@/schema/addres.Schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CheckoutOnloine } from "../_action/checkout.action";


export default function ChekOut({cartId}:{cartId:string}) {
    const form =useForm <addressSchemeForm>({
        resolver:zodResolver(addressScheme),
        defaultValues: {
      details: "",
      city: "",
      phone:"",
    },
    })
    async function Onsubmit(data:addressSchemeForm){
        const shippingAddress=data
const res= await CheckoutOnloine(cartId,'',shippingAddress)
console.log(res ,"here try nooow")
if(res?.status==="success"){
    window.location.href=res?.session?.url

}
    }
  return (
      <Form {...form}>
  <form onSubmit={form.handleSubmit(Onsubmit)} className="w-2/3 mx-auto my-5" >
    <FormField
      control={form.control}
      name="details"
      render={({ field }) => (
        <FormItem className="my-3">
          <FormLabel>details</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="city"
      render={({ field }) => (
        <FormItem className="my-3">
          <FormLabel>city</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="phone"
      render={({ field }) => (
        <FormItem className="my-3">
          <FormLabel>phone</FormLabel>
          <FormControl>
            <Input type="tel" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <Button onSubmit={form.handleSubmit(Onsubmit)} type="submit">Submit</Button>
  </form>
</Form>
  )
}
