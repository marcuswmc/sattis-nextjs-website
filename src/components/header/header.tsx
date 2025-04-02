import Image from "next/image";
import MobileNav from "./mobileNav";

import logo from "@/logos/sattis-logo_wb.png";
import DesktopNav from "./desktopNav";
import { Suspense } from "react";

export default function Header() {
  return (
    <header className="w-full px-8 py-8 md:px-16 md:py-11 flex items-center justify-between bg-transparent absolute z-20">
      <div>
        <Image src={logo} alt="Sattis studio" width={100} />
      </div>
      <div className="font-bold hidden md:flex">
        <Suspense fallback={null}>
          <DesktopNav />
        </Suspense>
      </div>
      <div className="font-bold flex md:hidden">
        <Suspense fallback={null}>
          <MobileNav />
        </Suspense>
      </div>
    </header>
  );
}
