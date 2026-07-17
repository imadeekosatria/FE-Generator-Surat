export function Footer() {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant mt-auto w-full mt-12 md:mt-16">
      <div className="flex flex-col md:flex-row justify-between items-center w-full py-8 px-4 md:px-8 max-w-container-max mx-auto gap-4">
        <div className="flex flex-col md:items-start gap-1 text-center md:text-left">
          <span className="text-sm font-bold text-primary">
            SIPKS Kemendagri
          </span>
          <div className="flex flex-col gap-0.5 mt-1">
            <span className="text-xs text-on-surface-variant">
              Direktorat Jenderal Kependudukan dan Pencatatan Sipil
            </span>
            <span className="text-xs text-on-surface-variant">
              Direktorat Integrasi Data Kependudukan Daerah
            </span>
            <span className="text-xs text-on-surface-variant">
              Tim Wilayah IV
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-2">
            © 2026 Kementerian Dalam Negeri Republik Indonesia. Seluruh Hak Cipta Dilindungi.
          </p>
        </div>
        <nav className="flex gap-4 mt-4 md:mt-0">
          <a
            className="text-xs text-on-surface-variant hover:text-primary transition-colors"
            href="#"
          >
            Kebijakan Privasi
          </a>
          <a
            className="text-xs text-on-surface-variant hover:text-primary transition-colors"
            href="#"
          >
            Syarat & Ketentuan
          </a>
          <a
            className="text-xs text-on-surface-variant hover:text-primary transition-colors"
            href="#"
          >
            Bantuan
          </a>
        </nav>
      </div>
    </footer>
  );
}
