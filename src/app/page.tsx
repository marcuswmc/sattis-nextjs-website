"use client";

import AboutSection from "@/components/aboutSection";
import BarberSection from "@/components/barberSection";
import EsteticaSection from "@/components/esteticaSection";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import PiercingSection from "@/components/piercingSection";
import TattooSection from "@/components/tattooSection";
import { motion } from "framer-motion";
import { Suspense } from "react";

const textVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
}

export default function Home() {
  return (
    <main className="overflow-hidden">
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
      <motion.div 
      variants={textVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="py-28 px-8 md:px-16 text-right">
        <h3 className="text-4xl">
          Descubra a fusão perfeita entre{" "}
          <span className="font-medium">
            estilo,
            <br /> arte e cuidado.
          </span>
        </h3>
      </motion.div>
      <div id="tattoos" className="scroll-mt-5">
        <TattooSection />
      </div>
      {/* <motion.div 
      variants={textVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }} className="py-28 px-8 md:px-16 text-left">
        <h3 className="text-4xl">
          Cada detalhe conta. <br />
          <span className="font-medium">Eleve sua aparência</span> com confiança
          e atitude.
        </h3>
      </motion.div>
      <div id="estetica" className="scroll-mt-5">
        <Suspense fallback={null}>

        <EsteticaSection />
        </Suspense>
      </div> */}
      <motion.div 
      variants={textVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }} className="py-28 px-8 md:px-16 text-right">
        <h3 className="text-4xl">
          Mais que tatuagens e piercings,
          <br />{" "}
          <span className="font-medium">expressamos a sua identidade</span>.
        </h3>
      </motion.div>
      <div id="piercings" className="scroll-mt-5">
        <PiercingSection />
      </div>
      <Footer />
    </main>
  );
}
