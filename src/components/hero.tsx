import { Button } from "./ui/button";
import { Calendar } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-[700px] md:h-screen flex flex-col items-end justify-end pb-20 px-8 md:px-16 w-full">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover filter grayscale"
      >
        <source src="/videos/background-video.webm" type="video/webm" />
        <source src="/videos/background-video.mp4" type="video/mp4" />
        Erro to rendering background video
      </video>

      
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 filter grayscale"></div>


      <div className="relative z-10">
        <Button variant="outline" className="text-md">
          Marcar horário
          <Calendar />
        </Button>
      </div>
    </section>
  );
}
