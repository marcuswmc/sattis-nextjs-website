import Image from "next/image";

import piercingSectionImg from "@/data/imgs/img-section-04.jpg";

import { Button } from "./ui/button";
import { MessageCircle, Instagram } from "lucide-react";

export default function PiercingSection() {
  return (
    <section className="flex flex-col md:flex-row w-full gap-5">
      <div className="relative w-full md:w-[50%]">
        <Image
          src={piercingSectionImg}
          alt="Barbearia"
          quality={100}
          className=""
        />
        <span className="absolute bottom-5 left-5 text-white text-6xl">
          Piercings
        </span>
      </div>
      <div className="bg-gray-100 w-full md:w-[50%] flex flex-col gap-8 py-20 px-8 justify-center md:px-20 order-last md:order-first md:rounded-tr-2xl md:rounded-r-2xl">
        <div className=" flex flex-col gap-5">
          <h3 className="text-3xl">
            Estilo e atitude <br />
            em cada detalhe.
          </h3>
          <p>
            Realçamos sua identidade com precisão e segurança, oferecendo
            piercings que unem arte, personalidade e sofisticação.
          </p>
        </div>

        <div className="flex gap-5">
          <Button
            variant="outline"
            className="mt-5 text-md border-black text-black cursor-pointer"
          >
            Orçamentos
            <MessageCircle />
          </Button>
          <Button
            variant="link"
            className="mt-5 text-md border-black text-black cursor-pointer"
          >
            Instagram
            <Instagram />
          </Button>
        </div>
      </div>
    </section>
  );
}
