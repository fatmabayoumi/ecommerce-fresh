"use client";
import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import slide1 from "../../assets/images/slider-image-1.jpeg";
import slide2 from "../../assets/images/slider-image-2.jpeg";
import slide3 from "../../assets/images/slider-image-3.jpeg";
import blog1 from "../../assets/images/blog-img-1.jpeg";
import blog2 from "../../assets/images/blog-img-2.jpeg";
import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";

export default function Mainslider() {
  return (
   <div className="lg:grid hidden my-4 mx-auto grid-cols-4"> {/* 4-column grid */}
  <div className="col-span-3"> {/* Takes 3 out of 4 columns */}
    <Swiper modules={[Autoplay]} spaceBetween={0} slidesPerView={1} 
     autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}>
      <SwiperSlide>
        <Image src={slide1} alt="slide1" className="h-[400px] object-cover w-full" />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={slide2} alt="slide2" className="h-[400px] object-cover w-full"/>
      </SwiperSlide>
      <SwiperSlide>
        <Image src={slide3} alt="slide3" className="h-[400px] object-cover w-full" />
      </SwiperSlide>
    </Swiper>
  </div>
  <div className="col-span-1"> {/* Takes 1 out of 4 columns */}
    <Image src={blog1} alt="slide1" className="h-[200px] object-cover w-full"/>
    <Image src={blog2} alt="slide1" className="h-[200px] object-cover w-full" />
  </div>
</div>
  );
}
