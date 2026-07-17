import { Moon, Sun } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";

export function Header() {
  const location = useLocation();
  const isPksActive = location.pathname.startsWith("/pks");
  const isJuknisActive = location.pathname.startsWith("/juknis");
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
        <Link to="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity cursor-pointer">
          <img
            alt="Logo Kemendagri"
            className="h-10 w-10 object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCq6zzH0ab0HLBCRTUTYcxhcGVLcZOqu5c24WxZeuV1CVBhlXFVUmRjiqpfDlVyTywfB0VCA9K3AsOTpvlxo8_hg49LlcIjI58F9M-nBt7Z1Vj66HMEh99p_X631AKjRhqkRZllPQTP-qcsiM51yAxpyuCJ1erjaxePVUvF_rqAdRtRRf7rlsfnBL7WgE626t9MUn8WxmoGQJdfnVfwjs-MQDyvbQl3qq4JkCqFKsKC5ONrq4bhcWDdLMH4mbyakufbuClWedrtPCk"
          />
          <div className="hidden md:flex flex-col justify-center">
            <h1 className="text-lg font-bold text-primary leading-tight">
              Kemendagri
            </h1>
            <span className="text-[10px] text-on-surface-variant leading-tight mt-0.5 font-medium tracking-wide">
              Direktorat Integrasi Data Kependudukan Daerah | Tim Wilayah IV
            </span>
          </div>
        </Link>
        <nav className="hidden md:flex gap-8 items-center h-full">
          <Link
            to="/pks/step-1"
            className={`text-on-surface-variant hover:text-primary transition-colors duration-200 font-headline-sm text-headline-sm flex items-center h-full border-b-2 ${isPksActive ? 'text-primary border-primary font-medium' : 'border-transparent'}`}
          >
            Generate PKS
          </Link>
          <Link
            to="/juknis/step-1"
            className={`text-on-surface-variant hover:text-primary transition-colors duration-200 font-headline-sm text-headline-sm flex items-center h-full border-b-2 ${isJuknisActive ? 'text-primary border-primary font-medium' : 'border-transparent'}`}
          >
            Generate Juknis
          </Link>
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
