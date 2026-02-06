
import getdata from "@/Api/product.api";
import Singelproduct from "../_component/singlrprod/Singelproduct";
export default async function page() {
  let data = await getdata();
  return (
    <div className="container w-[80%] my-12 mx-auto">
      <div className="flex flex-wrap">
        {data.map((currentproduct) => (
          <Singelproduct  product={currentproduct} key={currentproduct.id} />
        ))}
      </div>
    </div>
  );
}
