import SwiperSlider from "./swiperSlider";
import { Button } from "./ui/button";

export default function AboutSection() {
  return (
    <div className="py-20 overflow-hidden w-full">
      <div className="flex flex-col md:flex-row gap-14 px-5 md:px-16 items-start md:items-center justify-between">
        <div className="flex flex-col gap-5 md:w-[50%]">
          <h2 className="text-4xl">
            Transformamos<br/> estilo em{" "}
            <span className="font-medium">expressão</span>.
          </h2>

          <p className="text-md">
            Cuidamos do seu estilo com precisão e arte, elevando cada detalhe
            para refletir a sua identidade única.
          </p>
        </div>

        <div>
          <Button className="text-md">Ver serviços</Button>
        </div>
      </div>
      <div className="py-16 pl-5 md:pl-16">
        <SwiperSlider/>
      </div>
    </div>
  );
}
