"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Calendar, X } from "lucide-react";

export default function Hero() {
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="relative h-[700px] md:h-screen flex flex-col items-end justify-end pb-20 px-8 md:px-16 w-full">
      {/* Vídeo de fundo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover filter grayscale"
      >
        <source src="/videos/background-video.mp4" type="video/mp4" />
        Erro ao carregar o vídeo.
      </video>

      {/* Overlay preto para contraste */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 filter grayscale"></div>

      {/* Botão de Agendamento */}
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
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="relative bg-white rounded-lg w-full max-w-[450px] shadow-lg p-5">
            {/* Botão de Fechar */}
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
              onClick={() => setShowForm(false)}
            >
              <X size={24} />
            </button>

            {/* Formulário via Iframe */}
            <iframe
              src="https://www.sattis.me/appointment"
              className="w-full h-[600px] border-none"
            />
          </div>
        </div>
      )}
    </section>
  );
}
