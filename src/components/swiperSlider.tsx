"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import Image from "next/image";

import { SwiperData } from "@/data/swipeImgs";
import WorkSliderBtns from "./workSliderBtns";

const imgsData = SwiperData;

export default function SwiperSlider() {
  return (
    <div className="w-full">
      <Swiper
        spaceBetween={20}
        slidesPerView={1.2}
        breakpoints={
          {
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }
        }
        className="xl:h-[520px] mb-12"
      >
        {imgsData.map((slide, index) => {
          return (
            <SwiperSlide key={index} className="w-full">
              <div className="h-[460px] group flex justify-center items-center">
                {/* image */}
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
          );
        })}

         {/* slider buttons */}
         <div className="flex flex-col items-end pt-8 gap-6">
          <div>
            <p className="text-3xl">veja mais estilos</p>
          </div>
          <WorkSliderBtns
            containerStyles="flex gap-2 py-5 justify-end z-10"
            btnStyles="text-[22px] flex justify-center items-center transition-all rounded-lg"
          />
        </div>
      </Swiper>
       
    </div>
  );
}
