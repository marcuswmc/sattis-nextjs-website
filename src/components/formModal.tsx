"use client";

import { X } from "lucide-react";
import AppointmentForm from "./appointmentForm/AppointmentForm";
import Image from "next/image";
import imgBg from "@/data/imgs/bg-hero.jpg";
import { Button } from "./ui/button";
import { Suspense, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FormModal({ isOpen, onClose }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className="relative flex flex-col items-center h-auto bg-black rounded-lg w-full md:max-w-[600px] max-w-[450px] shadow-lg"
      >
        <div className="relative w-full h-auto">
          <button
            className="absolute top-3 right-3 text-gray-600 hover:text-black"
            onClick={onClose}
          >
            <X size={24} />
          </button>
          <Image src={imgBg} alt="Marcações" className="rounded-t-lg" />
        </div>
        <div className="p-6 w-full -mt-40 relative z-10 rounded-b-lg">
          <div className="flex justify-center">
            <Suspense fallback={<div>Carregando...</div>}>
              <AppointmentForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
