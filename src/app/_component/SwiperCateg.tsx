"use client";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";

export default function SwiperCateg({ data }: { data: any }) {
  // Check if data exists and is an array
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="w-[80%] mx-auto my-4">
        <p className="text-slate-500 font-semibold my-2">Shop popular category</p>
        <div className="text-center py-8 text-gray-400">
          No categories found
        </div>
      </div>
    );
  }

  return (
    <div className="w-[80%] mx-auto my-4">
      <p className="text-slate-500 font-semibold my-2">Shop popular category</p>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={7}
        spaceBetween={0}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          // Responsive breakpoints
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 7,
            spaceBetween: 0,
          },
        }}
      >
        {data.map((category: any) => (
          <SwiperSlide key={category._id || category.id || Math.random()}>
            <img
              src={category.image || "/placeholder.jpg"}
              alt={category.name || "Category"}
              className="h-[150px] object-cover w-full rounded-lg"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.jpg";
              }}
            />
            <p className="text-center mt-2 font-medium">{category.name}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}