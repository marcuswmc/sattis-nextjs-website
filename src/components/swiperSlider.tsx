"use client"

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperCore } from "swiper/types"; 
import "swiper/css";
import Image from "next/image";

import { SwiperData } from "@/data/swipeImgs";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { useRef } from "react";

const imgsData = SwiperData;

export default function SwiperSlider() {
  const swiperRef = useRef<SwiperCore | null >(null);

  return (
    <div className="w-full flex flex-col md:flex-row items-end md:items-end gap-8">
      <div className="flex flex-col items-end md:items-start gap-5 md:w-[20%] order-2 md:order-first pr-8">
        <p className="text-2xl">Veja mais estilos</p>
        <div className="flex gap-2">
          <button
            className="w-[44px] h-[44px] border border-black bg-transparent text-primary text-[22px] flex justify-center items-center transition-all rounded-lg cursor-pointer"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <ArrowLeft />
          </button>

          <button
            className="w-[100px] bg-black h-[44px] text-white text-[22px] flex justify-center items-center transition-all rounded-lg cursor-pointer "
            onClick={() => swiperRef.current?.slideNext()}
          >
            <ArrowRight/>
          </button>
        </div>
      </div>

      <div className="w-full md:w-[80%]">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          spaceBetween={20}
          slidesPerView={1.2}
          breakpoints={{
            375: {
              slidesPerView: 1.3,
              spaceBetween: 12,
            },

            480: {
              slidesPerView: 1.5,
              spaceBetween: 16,
            },

            640: {
              slidesPerView: 2.2,
              spaceBetween: 16,
            },

            768: {
              slidesPerView: 2.5,
              spaceBetween: 18,
            },

            1024: {
              slidesPerView: 3.2,
              spaceBetween: 20,
            },

            1280: {
              slidesPerView: 3.8,
              spaceBetween: 20,
            },

            1536: {
              slidesPerView: 4.1,
              spaceBetween: 24,
            },
          }}
          className="xl:h-[400px]"
        >
          {imgsData.map((slide, index) => (
            <SwiperSlide key={index} className="w-full">
              <div className="h-[400px] group flex justify-center items-center">
                <div className="relative w-full h-full">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    quality={85}
                    className="object-cover rounded-lg"
                    priority = {index < 3}
                    loading={index < 3 ? "eager" : "lazy"}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHR4f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Ss6RtNdPS7U9HUNm6a1BALuDYKcUACEUPCH9D8OiZeB4UtNxaBvIDNm4vj9fQXUpYqMVVTWr4FX1"

                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
