"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Calendar, X } from "lucide-react";
import FormModal from "./formModal";

export default function Hero() {
  const [showForm, setShowForm] = useState(false);
  return (
    <section className="relative h-[700px] md:h-screen flex flex-col items-end justify-end pb-20 px-8 md:px-16 w-full">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover filter grayscale"
      >
        <source src="/videos/background-video.webm" type="video/webm"/>
        <source src="/videos/background-video.mp4" type="video/mp4"/>
        Erro ao carregar o vídeo.
      </video>


      <div className="absolute top-0 left-0 w-full h-full bg-black/40 filter grayscale"></div>


      <div className="relative z-10">
        <Button
          variant="outline"
          className="text-md"
          onClick={() => setShowForm(true)}
        >
          Marcar horário
          <Calendar />
        </Button>
      </div>

      {/* Modal do Formulário */}
      <FormModal isOpen={showForm} onClose={() => setShowForm(false)} />
    </section>
  );
}
