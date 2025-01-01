import NavbarContent from "./navbar-content";

const WebNavbarMenu = () => {
  return (
    <ul className="md:flex items-center gap-x-4 border rounded-[1rem] px-8 py-4 hidden">
      <NavbarContent />
    </ul>
  );
};

export default WebNavbarMenu;
