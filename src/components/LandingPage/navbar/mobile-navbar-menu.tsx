import { cn } from "@/lib/utils";
import { useNavbarStoreSelector } from "@/store/navbar-store";
import NavbarContent from "./navbar-content";
import NavbarAuthentication from "./navbar-authentication";

const MobileNavbarMenu = () => {
  const openMobileNavbar = useNavbarStoreSelector.use.openMobileNavbar();

  return (
    <div
      className={cn(
        "fixed h-screen z-50 right-0 top-0 min-w-80 bg-brand-dark flex flex-col gap-4 items-center py-20 transition-transform duration-500 transform",
        openMobileNavbar ? "translate-x-0" : "translate-x-full"
      )}
    >
      <ul className="flex flex-col items-start gap-y-4 px-8 py-4">
        <NavbarContent />
        <NavbarAuthentication className="flex mt-8" />
      </ul>
    </div>
  );
};

export default MobileNavbarMenu;
