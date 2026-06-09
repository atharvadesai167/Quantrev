import PillNav from "./PillNav";
import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <div className="flex justify-center pt-5">
      <PillNav
        logo={logo}
        logoAlt="Quantrev AI"
        items={[
          { label: "Home", href: "/" },
          { label: "Features", href: "/features" },
          { label: "About", href: "/about" }
        ]}
        activeHref="/"
        baseColor="#000000"
        pillColor="#ffffff"
        hoveredPillTextColor="#ffffff"
        theme="light"
      />
    </div>
  );
}