"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Calendar } from "lucide-react";
import { Button } from "../ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";
import FormModal from "../formModal";

const links = [
  { name: "Início", path: "#inicio" },
  { name: "Barbearia", path: "#barbearia" },
  { name: "Tattoo", path: "#tattoos" },
  { name: "Estética", path: "#estetica" },
  { name: "Piercings", path: "#piercings" },
];

export default function MobileNav() {
  const [activeSection, setActiveSection] = useState("");
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);

  function handleOpenForm() {
    setOpen(false)
    setShowForm(true)
  }

  const handleScroll = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    targetId: string
  ) => {
    event.preventDefault();
    const section = document.querySelector(targetId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false);
    }
  };

  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY;

      links.forEach(({ path }) => {
        if (path.startsWith("#")) {
          const section = document.querySelector(path);
          if (section) {
            const offsetTop =
              section.getBoundingClientRect().top + window.scrollY;
            const offsetBottom = offsetTop + section.clientHeight;

            if (
              scrollPosition >= offsetTop - 100 &&
              scrollPosition < offsetBottom - 100
            ) {
              setActiveSection(path);
            }
          }
        }
      });
    };

    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="md:hidden p-2 bg-transparent text-white">
          <Menu size={24} />
        </button>
      </SheetTrigger>
      <SheetHeader className="hidden">
        <DialogTitle>Navigation</DialogTitle>
      </SheetHeader>
      <SheetContent
        side="right"
        className="bg-black/2 backdrop-blur-md p-5 flex flex-col justify-between items-end pb-20"
      >
        <nav className="flex flex-col items-end gap-11 pt-20">
          {links.map((link, index) => (
            <Link
              href={link.path}
              key={index}
              onClick={(event) => handleScroll(event, link.path)}
              className={`text-white ${
                activeSection === link.path ? "font-bold" : "font-normal"
              }  font-medium text-md cursor-pointer`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <Button
          variant="outline"
          className="text-md"
          onClick={() => handleOpenForm()}
        >
          Marcar horario
          <Calendar />
        </Button>
      </SheetContent>
      <Suspense fallback={null}>
        <FormModal isOpen={showForm} onClose={() => (setShowForm(false))} />
      </Suspense>
    </Sheet>
  );
}
