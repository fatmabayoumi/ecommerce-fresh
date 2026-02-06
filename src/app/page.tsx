import ALLcategories from "@/Api/ALLcategories";
import Mainslider from "./_component/Mainslider";
import SwiperCateg from "./_component/SwiperCateg";
import AllProduct from "./_component/Allproducts/AllProduct";


export default async function Home() {
  let data = await ALLcategories();
  console.log(data)
  return <>
   <Mainslider/>
   <SwiperCateg  data={data}  />
   <AllProduct/>
  </>
}
