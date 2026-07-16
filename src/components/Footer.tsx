export function Footer() {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant mt-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-center w-full py-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto gap-4">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-center md:text-left">
          <span className="font-label-md text-label-md font-bold text-primary">
            PKS Generator Kemendagri
          </span>
          <span className="font-body-md text-body-md text-on-surface-variant hidden md:inline">
            •
          </span>
          <p className="font-body-md text-body-md text-on-surface-variant">
            © 2024 Kementerian Dalam Negeri Republik Indonesia. Seluruh Hak Cipta Dilindungi.
          </p>
        </div>
        <nav className="flex gap-4">
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md"
            href="#"
          >
            Kebijakan Privasi
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md"
            href="#"
          >
            Syarat & Ketentuan
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md"
            href="#"
          >
            Bantuan
          </a>
        </nav>
      </div>
    </footer>
  );
}
