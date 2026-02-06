// AllProduct.tsx - Minimum fix
import getdata from "@/Api/product.api";
import Singelproduct from "../singlrprod/Singelproduct";

export default async function AllProduct() {
  const data = await getdata();
  
  // Add this check
  if (!data || !Array.isArray(data)) {
    return <div>Loading or no products...</div>;
  }
  
  return (
    <div className="container w-[80%] my-12 mx-auto">
      <div className="flex flex-wrap">
        {data.map((currentproduct: any) => (
          <Singelproduct 
            product={currentproduct} 
            key={currentproduct.id || currentproduct._id} 
          />
        ))}
      </div>
    </div>
  );
}