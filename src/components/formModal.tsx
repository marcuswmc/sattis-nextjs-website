"use client";

import { X } from "lucide-react";
import AppointmentForm from "./appointmentForm/AppointmentForm";
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
        className="relative flex flex-col items-center h-auto bg-black rounded-lg w-full md:max-w-[600px] max-w-[450px] max-h-[90vh] shadow-lg mx-2"
      >
        <div className="relative w-full h-auto z-50">
          <button
            className="absolute top-3 right-3 text-gray-600 hover:text-black"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6 w-full relative z-10 rounded-b-lg overflow-y-auto">
          <div className="flex justify-center">
            <Suspense fallback={null}>
              <AppointmentForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
