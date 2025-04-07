"use client";

import Image from "next/image";
import tattooSectionImg from "@/data/imgs/img-section-02.jpg";
import { Button } from "./ui/button";
import { MessageCircle, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const itemVariantsLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const itemVariantsRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

export default function TattooSection() {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="flex flex-col md:flex-row w-full gap-5"
    >
      {/* Container da imagem */}
      <motion.div
        variants={itemVariantsLeft}
        className="relative w-full md:w-[50%]"
      >
        <Image src={tattooSectionImg} alt="Tattoo" quality={100} className="" />
        <span className="absolute bottom-5 left-5 text-white text-6xl">
          Tattoo
        </span>
      </motion.div>

      {/* Container de conteúdo */}
      <motion.div
        variants={itemVariantsRight}
        className="bg-gray-100 w-full md:w-[50%] flex flex-col gap-8 py-20 px-8 justify-center md:px-20 order-last md:order-first md:rounded-tr-2xl md:rounded-r-2xl"
      >
        <motion.div
          variants={itemVariantsRight}
          className="flex flex-col gap-5"
        >
          <h3 className="text-3xl">
            Arte na pele, marcada <br />
            com alma e precisão.
          </h3>
          <p>
            Transformamos histórias em traços únicos, combinando criatividade e
            técnica para eternizar sua essência com arte e expressão.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariantsRight}
          className="flex gap-5 flex-wrap"
        >
          <Button
            asChild
            variant="outline"
            className="mt-5 text-md border-black text-black cursor-pointer"
          >
            <Link href={"https://wa.me/351914668874"} target="_blank">
              Orçamentos <MessageCircle />
            </Link>
          </Button>
          <Button
            variant="link"
            className="mt-5 text-md border-black text-black cursor-pointer"
          >
            <Link href={"https://www.instagram.com/gabrielagoncalvestattoo/"} target="_blank">
              Instagram <Instagram />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
