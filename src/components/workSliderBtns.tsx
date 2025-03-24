"use client";

import { useSwiper } from "swiper/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type SliderBtnsProps = {

  containerStyles: string;
  btnStyles: string;
  iconStyles?: string;
};

export default function WorkSliderBtns({

  containerStyles,
  btnStyles,
  iconStyles,
}: SliderBtnsProps) {
  const swiper = useSwiper();

  return (
    <div className={containerStyles}>
      <button className={`w-[44px] h-[44px] border border-black bg-transparent text-primary ${btnStyles}`} onClick={() => swiper.slidePrev()}>
        <ArrowLeft className={iconStyles} />
      </button>
      <button className={`w-[100px] bg-black h-[44px] text-white ${btnStyles}`} onClick={() => swiper.slideNext()}>
        <ArrowRight className={iconStyles} />
      </button>
      <button className={`w-[100px] bg-black h-[44px] text-white ${btnStyles}`} onClick={() => swiper.slideNext()}>
        <ArrowRight className={iconStyles} />
      </button>
    </div>
  );
}
