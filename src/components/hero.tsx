"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Calendar, X } from "lucide-react";
import FormModal from "./formModal";
import { useTranslations } from "next-intl";

export default function Hero() {
  const [showForm, setShowForm] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const t = useTranslations('hero')

  useEffect(() => {
    if(videoRef.current){
      videoRef.current.muted = true
      videoRef.current.play().catch(error => {
        console.log("Erro ao iniciar vídeo automaticamente:", error);
      })
    }
  }, [])

  return (
    <section className="relative h-[700px] md:h-screen flex flex-col items-end justify-end pb-20 px-8 md:px-16 w-full">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        webkit-playsinline="true"
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover filter grayscale"
      >
        <source src="/videos/background-video.mp4" type="video/mp4"/>
        <source src="/videos/background-video.webm" type="video/webm"/>
        Erro ao carregar o vídeo.
      </video>


      <div className="absolute top-0 left-0 w-full h-full bg-black/40 filter grayscale"></div>


      <div className="relative z-10">
        <Button
          variant="outline"
          className="text-md"
          onClick={() => setShowForm(true)}
        >
          {t('book-now-btn')}
          <Calendar />
        </Button>
      </div>

      {/* Modal do Formulário */}
      <FormModal isOpen={showForm} onClose={() => setShowForm(false)} />
    </section>
  );
}
