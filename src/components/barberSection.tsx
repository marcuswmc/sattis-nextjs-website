"use client";

import Image from "next/image";
import { useState, Suspense } from "react";
import barberSectionImg from "@/data/imgs/img-section-01.jpg";
import checkIc from "@/data/icons/check-ic.svg";
import { Button } from "./ui/button";
import { Calendar } from "lucide-react";
import FormModal from "./formModal";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const itemVariantsLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const itemVariantsRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

export default function BarberSection() {
  const [showForm, setShowForm] = useState(false);
  const t = useTranslations('barbershop-section')

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="pt-28 flex flex-col md:flex-row w-full gap-5"
    >
      {/* Container da imagem */}
      <motion.div variants={itemVariantsLeft} className="relative w-full md:w-[50%]">
        <Image
          src={barberSectionImg}
          alt="Barbearia"
          quality={100}
          className="w-full h-full object-cover object-center"
        />
        <span className="absolute bottom-5 left-5 text-white text-6xl">
          {t('section-title')}
        </span>
      </motion.div>

      {/* Container de conteúdo */}
      <motion.div
        variants={itemVariantsRight}
        className="bg-gray-100 w-full md:w-[50%] flex flex-col gap-8 py-20 px-8 justify-center md:px-20 md:rounded-tl-2xl md:rounded-l-2xl"
      >
        <motion.div variants={itemVariantsRight} className="flex flex-col gap-5">
          <h3 className="text-3xl">
            {t('f-line-title')} <br />
            {t('s-line-title')}
          </h3>
          <p>
            {t('description')}
          </p>
        </motion.div>

        <motion.div variants={itemVariantsRight} className="flex flex-col gap-5 justify-center">
          <div className="flex flex-col gap-5 md:gap-0 md:flex-row md:items-center">
            <div className="flex gap-5 items-center w-full md:w-[50%]">
              <Image src={checkIc} alt="service-icon" />
              <p className="uppercase">{t('service-01')}</p>
            </div>
            <div className="flex gap-5 items-center w-full md:w-[50%]">
              <Image src={checkIc} alt="service-icon" />
              <p className="uppercase">{t('service-02')}</p>
            </div>
          </div>
          <div className="flex flex-col gap-5 md:gap-0 md:flex-row md:items-center">
            <div className="flex gap-5 items-center w-full md:w-[50%]">
              <Image src={checkIc} alt="service-icon" />
              <p className="uppercase">{t('service-03')}</p>
            </div>
            <div className="flex gap-5 items-center w-full md:w-[50%]">
              <Image src={checkIc} alt="service-icon" />
              <p className="uppercase">{t('service-04')}</p>
            </div>
          </div>
          <div className="flex flex-col gap-5 md:gap-0 md:flex-row md:items-center">
            <div className="flex gap-5 items-center w-full md:w-[50%]">
              <Image src={checkIc} alt="service-icon" />
              <p className="uppercase">{t('service-05')}</p>
            </div>
            <div className="flex gap-5 items-center w-full md:w-[50%]">
              <Image src={checkIc} alt="service-icon" />
              <p className="uppercase">{t('service-06')}</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariantsRight}>
          <Button
            variant="outline"
            className="mt-5 text-md border-black text-black cursor-pointer"
            onClick={() => setShowForm(true)}
          >
            {t('barbershop-book-btn')} <Calendar />
          </Button>
        </motion.div>
      </motion.div>

      <Suspense fallback={null}>
        <FormModal isOpen={showForm} onClose={() => setShowForm(false)} />
      </Suspense>
    </motion.section>
  );
}
