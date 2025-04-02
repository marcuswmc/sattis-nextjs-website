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
            1024: {
              slidesPerView: 4.1,
              spaceBetween: 20,
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
                    quality={100}
                    className="object-cover rounded-lg"
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
