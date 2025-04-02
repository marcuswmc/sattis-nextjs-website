"use client";

import Image from "next/image";

import barberSectionImg from "@/data/imgs/img-section-01.jpg";
import checkIc from "@/data/icons/check-ic.svg";
import { Button } from "./ui/button";
import { Calendar, Divide } from "lucide-react";
import { Suspense, useState } from "react";
import FormModal from "./formModal";

export default function BarberSection() {
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="pt-28 flex flex-col md:flex-row w-full gap-5">
      <div className="relative w-full md:w-[50%]">
        <Image
          src={barberSectionImg}
          alt="Barbearia"
          quality={100}
          className=""
        />
        <span className="absolute bottom-5 left-5 text-white text-6xl">
          Barbearia
        </span>
      </div>
      <div className="bg-gray-100 w-full md:w-[50%] flex flex-col gap-8 py-20 px-8 justify-center md:px-20 md:rounded-tl-2xl md:rounded-l-2xl">
        <div className=" flex flex-col gap-5">
          <h3 className="text-3xl">
            A redefinir os cuidados <br />
            com expertise e paixão.
          </h3>
          <p>
            Cuidamos do seu estilo com precisão e arte, elevando cada detalhe
            para refletir a sua identidade única.
          </p>
        </div>
        <div className="flex flex-col gap-5 justify-center">
          <div className="flex flex-col gap-5 md:gap-0 md:flex-row md:items-center">
            <div className="flex gap-5 items-center w-full md:w-[50%]">
              <Image src={checkIc} alt="service-icon" />
              <p className="uppercase">Cabelo e barba</p>
            </div>
            <div className="flex gap-5 items-center w-full md:w-[50%]">
              <Image src={checkIc} alt="service-icon" />
              <p className="uppercase">Cabelo comprido</p>
            </div>
          </div>
          <div className="flex flex-col gap-5 md:gap-0 md:flex-row md:items-center">
            <div className="flex gap-5 items-center w-full md:w-[50%]">
              <Image src={checkIc} alt="service-icon" />
              <p className="uppercase">Basic</p>
            </div>
            <div className="flex gap-5 items-center w-full md:w-[50%]">
              <Image src={checkIc} alt="service-icon" />
              <p className="uppercase">Premium</p>
            </div>
          </div>
        </div>
        <div>
          <Button
            variant="outline"
            className="mt-5 text-md border-black text-black cursor-pointer"
            onClick={() => setShowForm(true)}
          >
            Marcar horario
            <Calendar />
          </Button>
        </div>
      </div>
      <Suspense fallback={null}>
        <FormModal isOpen={showForm} onClose={() => setShowForm(false)} />
      </Suspense>
    </section>
  );
}
