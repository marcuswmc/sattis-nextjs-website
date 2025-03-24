import AboutSection from "@/components/aboutSection";
import BarberSection from "@/components/barberSection";
import EsteticaSection from "@/components/esteticaSection";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import PiercingSection from "@/components/piercingSection";
import TattooSection from "@/components/tattooSection";

export default function Home() {
  return (
    <main>
      <div>
        <Hero />
      </div>
      <div>
        <AboutSection />
      </div>
      <div>
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
      <div>
        <TattooSection />
      </div>
      <div className="py-28 px-8 md:px-16 text-left">
        <h3 className="text-4xl">
          Cada detalhe conta. <br />
          <span className="font-medium">Eleve sua aparência</span> com confiança
          e atitude.
        </h3>
      </div>
      <div>
        <EsteticaSection />
      </div>
      <div className="py-28 px-8 md:px-16 text-right">
        <h3 className="text-4xl">
          Mais que tatuagens e piercings,
          <br />{" "}
          <span className="font-medium">expressamos a sua identidade</span>.
        </h3>
      </div>
      <div>
        <PiercingSection />
      </div>
      <Footer />
    </main>
  );
}
