"use client";

import Image from "next/image";
import logo from "@/logos/sattis-logo_wb.png";
import {
  Calendar,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Button } from "./ui/button";
import FormModal from "./formModal";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="mt-28 bg-black px-8 md:px-16 py-20 flex justify-between flex-col md:flex-row gap-12 text-white">
      <div className="flex flex-col gap-8">
        <div>
          <Image src={logo} alt="Sattis Studio" width={100} />
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex gap-3">
            <Phone size={18} />
            <p className="text-sm">(+351) 999 888 777</p>
          </div>
          <div className="flex gap-3">
            <Mail size={18} />
            <p className="text-sm">sattis@hotmail.com</p>
          </div>
          <div className="flex gap-3">
            <MapPin size={18} />
            <p className="text-sm">
              Rua João das Regras, 350 <br />
              Porto, Portugal 4000-291
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start md:items-end space-y-5">
        <div className="">
          <Button
            variant="secondary"
            className="text-md cursor-pointer"
            onClick={() => setShowForm(true)}
          >
            Marcar horário
            <Calendar />
          </Button>
        </div>
        <div className="flex space-x-5">
          <Button variant="outline">
            Fale Connosco
            <MessageCircle />
          </Button>
          <Link href="https://www.instagram.com/s4ttis/" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="cursor-pointer">
              <Instagram size={24} />
            </Button>
          </Link>
        </div>
        <FormModal isOpen={showForm} onClose={() => setShowForm(false)} />
      </div>
    </div>
  );
}
