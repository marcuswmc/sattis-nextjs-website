import Image from "next/image";

import heroBg from "@/data/imgs/bg-hero.jpg"
import { Button } from "./ui/button";
import { Calendar } from "lucide-react";

export default function Hero() {
  return (
    <div className="h-screen bg-cover bg-center flex flex-col items-end justify-end pb-20 px-5 md:px-16 w-full" style={{backgroundImage: `url(${heroBg.src})`}}>
        <Image src={heroBg} alt="Sattis background" className="hidden" quality={100}/>
      <div>
      <Button variant="outline" className="text-md">
          Marcar horario
          <Calendar/>
        </Button>
      </div>
    </div>
  )
}
