"use client";

import Image from "next/image";

import esteticaSectionImg from "@/data/imgs/img-section-03.jpg";
import checkIc from "@/data/icons/check-ic.svg";
import { Button } from "./ui/button";
import { Calendar } from "lucide-react";
import { Suspense, useState } from "react";
import FormModal from "./formModal";

export default function EsteticaSection() {
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="flex flex-col md:flex-row w-full gap-5">
      <div className="relative w-full md:w-[50%]">
        <Image
          src={esteticaSectionImg}
          alt="Barbearia"
          quality={100}
          className=""
        />
        <span className="absolute top-5 left-5 text-white text-6xl">
          Estética
        </span>
      </div>
      <div className="bg-gray-100 w-full md:w-[50%] flex flex-col gap-8 py-20 px-8 justify-center md:px-20 md:rounded-tl-2xl md:rounded-l-2xl">
        <div className=" flex flex-col gap-5">
          <h3 className="text-3xl">
            Elevamos a estética <br />
            com técnica e paixão.
          </h3>
          <p>
            Realçamos a sua beleza com cuidado, unindo inovação e sofisticação
            para destacar a sua melhor versão.
          </p>
        </div>
        <div className="flex flex-col gap-5 justify-center">
          <div className="flex flex-col gap-5 md:gap-0 md:flex-row md:items-center">
            <div className="flex gap-5 items-center w-full md:w-[50%]">
              <Image src={checkIc} alt="service-icon" />
              <p className="uppercase">Limpeza de pele</p>
            </div>
            <div className="flex gap-5 items-center w-full md:w-[50%]">
              <Image src={checkIc} alt="service-icon" />
              <p className="uppercase">Design de sobrancelhas</p>
            </div>
          </div>
          <div className="flex flex-col gap-5 md:gap-0 md:flex-row md:items-center">
            <div className="flex gap-5 items-center w-full md:w-[50%]">
              <Image src={checkIc} alt="service-icon" />
              <p className="uppercase">Dermaplaning</p>
            </div>
            <div className="flex gap-5 items-center w-full md:w-[50%]">
              <Image src={checkIc} alt="service-icon" />
              <p className="uppercase">Brow lamination</p>
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
      <Suspense fallback={<div>Carregando...</div>}>
        <FormModal isOpen={showForm} onClose={() => setShowForm(false)} />
      </Suspense>
    </section>
  );
}
