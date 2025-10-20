"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/button";

import { useTranslations } from "next-intl";

export default function DesktopNav() {
  const [activeSection, setActiveSection] = useState("");

  const t = useTranslations('navLinks')

  const linkKeys = [
    "home",
    "barbershop",
    "tattoo",
    "piercings"
  ];

  const navLinks = linkKeys.map((key) => ({
    key,
    name: t(`${key}.name`),
    path: t(`${key}.path`)
  }))

  const handleScroll = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    targetId: string
  ) => {
    event.preventDefault();
    const section = document.querySelector(targetId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY;

      navLinks.forEach(({ path }) => {
        if (path.startsWith("#")) {
          const section = document.querySelector(path);
          if (section) {
            const offsetTop =
              section.getBoundingClientRect().top + window.scrollY;
            const offsetBottom = offsetTop + section.clientHeight;

            if (
              scrollPosition >= offsetTop - 200 &&
              scrollPosition < offsetBottom - 10
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
    <nav className="flex gap-8">
      {navLinks.map(({key, name, path}) => (
        <Link
          href={path}
          key={key}
          onClick={(event) => handleScroll(event, path)}
          className={`${
            activeSection === path ? "font-medium" : "font-normal"
          } text-white font-normal text-md cursor-pointer`}
        >
          {name}
        </Link>
      ))}
    </nav>
  );
}
