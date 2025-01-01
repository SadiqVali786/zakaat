"use client";

import { cn } from "@/lib/utils";
import { useNavbarStoreSelector } from "@/store/navbar-store";

const NavbarBackdrop = () => {
  const setOpenMobileNavbar = useNavbarStoreSelector.use.setOpenMobileNavbar();
  const openMobileNavbar = useNavbarStoreSelector.use.openMobileNavbar();

  return (
    <div
      className={cn(
        "fixed top-0 right-0 left-0 h-screen w-screen backdrop-blur-lg z-50",
        openMobileNavbar ? "" : "hidden"
      )}
      onClick={() => setOpenMobileNavbar(false)}
    />
  );
};

export default NavbarBackdrop;
