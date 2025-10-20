"use client"

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperCore } from "swiper/types"; 
import "swiper/css";
import Image from "next/image";

import { SwiperData } from "@/data/swipeImgs";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { useRef } from "react";
import { useTranslations } from "next-intl";

const imgsData = SwiperData;

export default function SwiperSlider() {
  const swiperRef = useRef<SwiperCore | null >(null);

  const t = useTranslations('about-section')

  return (
    <div className="w-full flex flex-col md:flex-row items-end md:items-end gap-8">
      <div className="flex flex-col items-end md:items-start gap-5 md:w-[20%] order-2 md:order-first pr-8">
        <p className="text-2xl">{t('slide-btn-text')}</p>
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
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+Cjwvc3ZnPgo="

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
