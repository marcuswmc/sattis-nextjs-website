import Image from "next/image";
import MobileNav from "./mobileNav";

import logo from "@/logos/sattis-logo_wb.png"
import DesktopNav from "./desktopNav";

export default function Header() {
  return (
    <header className="w-full px-5 py-8 md:px-16 md:py-11 flex items-center justify-between bg-transparent absolute">
      <div>
        <Image src={logo} alt="Sattis studio" width={80}/>
      </div>
      <div className="font-bold hidden md:flex">
        <DesktopNav/>
      </div>
      <div className="font-bold flex md:hidden">
        <MobileNav/>
      </div>
    </header>
  )
}
