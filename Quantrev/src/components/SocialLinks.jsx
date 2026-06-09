import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function SocialLinks() {
  return (
    <div className="fixed bottom-4 left-4 flex flex-col gap-3 z-50">

      <a
        href="https://github.com/atharvadesai167"
        target="_blank"
        rel="noreferrer"
        className="p-2 rounded-full border border-black/10 bg-white hover:scale-110 transition shadow-sm"
      >
        <FaGithub size={18} />
      </a>

      <a
        href="https://www.linkedin.com/in/atharva-desai-92b665391/"
        target="_blank"
        rel="noreferrer"
        className="p-2 rounded-full border border-black/10 bg-white hover:scale-110 transition shadow-sm"
      >
        <FaLinkedin size={18} />
      </a>

      <a
        href="https://www.instagram.com/atharva_desai7/"
        target="_blank"
        rel="noreferrer"
        className="p-2 rounded-full border border-black/10 bg-white hover:scale-110 transition shadow-sm"
      >
        <FaInstagram size={18} />
      </a>

    </div>
  );
}