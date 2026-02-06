
import ALLcategories from "@/Api/ALLcategories"
import Link from "next/link"

export default async function CategoriesPage() {
  const categories = await ALLcategories()

  return (
    <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
      {categories.map((cat: any) => (
        <Link key={cat._id} href={`/categories/${cat._id}`}>
          <img src={cat.image} />
          <p className="text-center">{cat.name}</p>
        </Link>
      ))}
    </div>
  )
}
