'use client'

import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}


export default function FormModal({isOpen, onClose}: ModalProps) {
  if(!isOpen) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="relative bg-white rounded-lg w-full max-w-[450px] shadow-lg p-5">
            {/* Botão de Fechar */}
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
              onClick={onClose}
            >
              <X size={24} />
            </button>

            {/* Formulário via Iframe */}
            <iframe
              src="https://app.sattis.me/appointment"
              className="w-full h-[600px] border-none"
            />
          </div>
        </div>
  )
}
