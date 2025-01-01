"use client";
import React from "react";

import NavbarBrand from "./navbar-brand";
import WebNavbarMenu from "./web-navbar-menu";
import NavbarMenuToggle from "./navbar-menu-toggle";
import NavbarBackdrop from "./navbar-backdrop";
import NavbarAuthentication from "./navbar-authentication";
import MobileNavbarMenu from "./mobile-navbar-menu";

export default function Navbar() {
  return (
    <React.Fragment>
      <section
        className="flex justify-between items-center py-8 sm:mb-44 mb-20 border-b-[1px] border-neutral-11"
        style={{
          marginLeft: "clamp(1rem, 4.9vw, 5rem)",
          marginRight: "clamp(1rem, 4.9vw, 5rem)",
        }}
      >
        <NavbarBrand />
        <WebNavbarMenu />
        <NavbarAuthentication className="md:flex hidden" />
        <NavbarMenuToggle />
        <NavbarBackdrop />
        <MobileNavbarMenu />
      </section>
    </React.Fragment>
  );
}
