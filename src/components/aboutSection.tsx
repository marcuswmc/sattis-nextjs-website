import SwiperSlider from "./swiperSlider";

export default function AboutSection() {
  return (
    <section className="pt-28 overflow-hidden w-full">
      <div className="flex flex-col md:flex-row gap-14 px-8 md:px-16 items-start md:items-center justify-between">
        <div className="flex flex-col gap-5 md:w-[50%]">
          <h2 className="text-4xl">
            Transformamos
            <br /> estilo em <span className="font-medium">expressão</span>.
          </h2>

          <p className="text-md">
            Cuidamos do seu estilo com precisão e arte, elevando cada detalhe
            para refletir a sua identidade única.
          </p>
        </div>

      </div>
      <div className="pt-20 pl-8 md:pl-16">
        <SwiperSlider />
      </div>
    </section>
  );
}
