import { LogoMark } from '../ui/LogoMark';
import { footer } from '../../data/content';

export function Footer() {
  return (
    <footer className="border-t border-paper-300/30">
      <div className="max-w-[1320px] mx-auto px-6 md:px-12 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-end">
          <div className="md:col-span-8">
            <div className="flex items-center gap-3 mb-5">
              <LogoMark size={22} className="text-paper-900" />
              <span className="display text-[22px] text-paper-900 tracking-tighter2">стоунхедж</span>
            </div>
            <p className="text-paper-700 text-[15px] leading-relaxed max-w-[60ch]">
              {footer.tagline}
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <p className="font-mono tracking-[0.18em] uppercase text-paper-900/35 text-[11px]">
              москва · московская область
            </p>
          </div>
        </div>

        <div className="hairline my-10" />

        <div className="flex flex-col md:flex-row justify-between gap-3 text-[12px] text-paper-900/45">
          <p>{footer.bottom}</p>
          <p className="font-mono tracking-[0.18em] uppercase text-paper-900/35">
            каталог 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
