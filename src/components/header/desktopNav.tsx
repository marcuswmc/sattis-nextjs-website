"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const links = [
  { name: "Início", path: "#inicio" },
  { name: "Barbearia", path: "#barbearia-section" },
  { name: "Tattoo", path: "#tattoo-section" },
  { name: "Estética", path: "#estetica-section" },
  { name: "Piercings", path: "#piercings-section" },
];

export default function DesktopNav() {
  const [activeSection, setActiveSection] = useState("");

  const handleScroll = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
    event.preventDefault();
    const section = document.querySelector(targetId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY;

      links.forEach(({ path }) => {
        if (path.startsWith("#")) {
          const section = document.querySelector(path);
          if (section) {
            const offsetTop = section.getBoundingClientRect().top + window.scrollY;
            const offsetBottom = offsetTop + section.clientHeight;
            
            if (scrollPosition >= offsetTop - 200 && scrollPosition < offsetBottom - 10) {
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
    <nav className="flex gap-8">
      {links.map((link, index) => (
        <Link
          href={link.path}
          key={index}
          onClick={(event) => handleScroll(event, link.path)}
          className={`${
            activeSection === link.path
              ? "font-medium"
              : "font-normal"
          } text-white font-normal text-md cursor-pointer`}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
