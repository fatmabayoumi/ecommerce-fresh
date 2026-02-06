import authOptions from '@/Auth'
import { getServerSession } from 'next-auth'
import Cart from './_componets/Cart'


export default async function page() {
    const session = await getServerSession(authOptions())
    console.log(session)
  return (
  <Cart/>
  )
}
