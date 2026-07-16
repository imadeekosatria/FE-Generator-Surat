import { Moon, Sun } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";

export function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };

  return (
    <header className="bg-surface-container-lowest border-b border-outline-variant sticky top-0 z-50 w-full">
      <div className="flex justify-between items-center w-full px-4 md:px-8 h-16 max-w-container-max mx-auto">
        <div className="flex items-center gap-4">
          <img
            alt="Logo Kemendagri"
            className="h-10 w-10 object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCq6zzH0ab0HLBCRTUTYcxhcGVLcZOqu5c24WxZeuV1CVBhlXFVUmRjiqpfDlVyTywfB0VCA9K3AsOTpvlxo8_hg49LlcIjI58F9M-nBt7Z1Vj66HMEh99p_X631AKjRhqkRZllPQTP-qcsiM51yAxpyuCJ1erjaxePVUvF_rqAdRtRRf7rlsfnBL7WgE626t9MUn8WxmoGQJdfnVfwjs-MQDyvbQl3qq4JkCqFKsKC5ONrq4bhcWDdLMH4mbyakufbuClWedrtPCk"
          />
          <h1 className="font-headline-md text-headline-md font-bold text-primary hidden md:block">
            PKS Generator Kemendagri
          </h1>
        </div>
        <nav className="hidden md:flex gap-8 items-center h-full">
          <Link
            to="/"
            className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-headline-sm text-headline-sm flex items-center h-full border-b-2 border-transparent [&.active]:text-primary [&.active]:border-primary"
          >
            Dashboard
          </Link>
          <a
            href="#"
            className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-headline-sm text-headline-sm flex items-center h-full border-b-2 border-transparent"
          >
            Arsip PKS
          </a>
          <a
            href="#"
            className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-headline-sm text-headline-sm flex items-center h-full border-b-2 border-transparent"
          >
            Panduan
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="text-on-surface-variant hover:text-primary p-2 rounded-full hover:bg-surface-container-high transition-colors"
            title="Toggle Theme"
          >
            {isDark ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
