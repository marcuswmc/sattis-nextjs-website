"use client";

import AboutSection from "@/components/aboutSection";
import BarberSection from "@/components/barberSection";
import EsteticaSection from "@/components/esteticaSection";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import PiercingSection from "@/components/piercingSection";
import TattooSection from "@/components/tattooSection";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <div id="inicio" className="scroll-mt-5">
        <Suspense fallback={null}>
          <Hero />
        </Suspense>
      </div>
      <div id="studio" className="scroll-mt-5">
        <Suspense fallback={null}>

        <AboutSection />
        </Suspense>
      </div>
      <div id="barbearia" className="scroll-mt-5">
        <BarberSection />
      </div>
      <div className="py-28 px-8 md:px-16 text-right">
        <h3 className="text-4xl">
          Descubra a fusão perfeita entre{" "}
          <span className="font-medium">
            estilo,
            <br /> arte e cuidado.
          </span>
        </h3>
      </div>
      <div id="tattoos" className="scroll-mt-5">
        <TattooSection />
      </div>
      <div className="py-28 px-8 md:px-16 text-left">
        <h3 className="text-4xl">
          Cada detalhe conta. <br />
          <span className="font-medium">Eleve sua aparência</span> com confiança
          e atitude.
        </h3>
      </div>
      <div id="estetica" className="scroll-mt-5">
        <Suspense fallback={null}>

        <EsteticaSection />
        </Suspense>
      </div>
      <div className="py-28 px-8 md:px-16 text-right">
        <h3 className="text-4xl">
          Mais que tatuagens e piercings,
          <br />{" "}
          <span className="font-medium">expressamos a sua identidade</span>.
        </h3>
      </div>
      <div id="piercings" className="scroll-mt-5">
        <PiercingSection />
      </div>
      <Footer />
    </main>
  );
}
