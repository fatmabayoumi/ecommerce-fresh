import Image from "next/image"
import logo from "@/assets/images/freshcart-logo.svg"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-100 p-6">
      <div className="flex justify-between">
        <Image src={logo} alt="logo" />
        <div className="flex gap-4">
          <Link href="/products">Products</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/brands">Brands</Link>
        </div>
      </div>
      <p className="text-center text-sm mt-4">
        © FreshCart
      </p>
    </footer>
  )
}
