"use client";

import { Suspense } from "react";
import SwiperSlider from "./swiperSlider";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const textVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.5 } },
};

const sliderVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.5 } },
};

export default function AboutSection() {

  const t = useTranslations('about-section')

  return (
    <section className="pt-28 overflow-hidden w-full">
      <div className="flex flex-col md:flex-row gap-14 px-8 md:px-16 items-start md:items-center justify-between">
        <motion.div
          className="flex flex-col gap-5 md:w-[50%]"
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl">
            {t('f-line-title')}
            <br /> {t('s-line-title')} <span className="font-medium">{t('t-line-title')}</span>
          </h2>

          <p className="text-md">
            {t('subtitle')}
          </p>
        </motion.div>
      </div>
      <div className="pt-20 pl-8 md:pl-16">
        <Suspense fallback={null}>
          <motion.div
            variants={sliderVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <SwiperSlider />
          </motion.div>
        </Suspense>
      </div>
    </section>
  );
}
