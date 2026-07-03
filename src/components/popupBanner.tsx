"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";


export default function PopupBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={() => setVisible(false)}
    >
      <div
        className="relative mx-5 w-full max-w-sm md:mx-0 md:max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setVisible(false)}
          className="absolute -top-7 right-0 flex items-center gap-1 text-white text-sm font-medium hover:text-gray-300 transition-colors"
          aria-label="Fechar"
        >
          fechar <X size={14} />
        </button>

        <Link href={"https://breturintatua.carrd.co/?utm_source=ig&utm_medium=social&utm_content=link_in_bio"} target="_blank" rel="noopener noreferrer">
          <Image
            src="/imgs/popup_new.jpeg"
            alt="Agenda Aberta - Porto, Portugal"
            width={500}
            height={700}
            className="w-full h-auto rounded-md cursor-pointer"
            priority
          />
        </Link>
      </div>
    </div>
  );
}
