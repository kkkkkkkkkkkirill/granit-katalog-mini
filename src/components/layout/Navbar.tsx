import { useEffect, useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { LogoMark } from '../ui/LogoMark';
import { LiquidGlass } from '../ui/LiquidGlass';
import { nav } from '../../data/content';
import { useCart } from '../../state/cart';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const cart = useCart();

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        className="flex items-center justify-between gap-4 px-4 sm:px-6 md:px-12 py-4 md:py-6"
        aria-label="главная навигация"
      >
        {/* Логотип */}
        <a
          href="#top"
          className="animate-blur-fade-up flex items-center gap-2.5 group"
          style={{ animationDelay: '0ms' }}
          aria-label="на главную"
        >
          <LogoMark size={20} className="text-paper-900" />
          <span className="text-paper-900 text-[14px] tracking-tighter2 font-medium">
            стоунхедж
          </span>
        </a>

        {/* Центральная навигация — только desktop */}
        <ul className="hidden lg:flex items-center gap-1">
          {nav.map((link, i) => (
            <li
              key={link.href}
              className="animate-blur-fade-up"
              style={{ animationDelay: `${100 + i * 50}ms` }}
            >
              <a
                href={link.href}
                className="text-paper-700 hover:text-paper-900 text-[13.5px] px-4 py-2 transition-colors duration-300 ease-out"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Правая группа: подбор + бургер */}
        <div className="flex items-center gap-2">
          <CartButton count={cart.count} />

          <LiquidGlass
            as="button"
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'закрыть меню' : 'открыть меню'}
            aria-expanded={open}
            className="lg:hidden w-10 h-10 rounded-full inline-flex items-center justify-center text-paper-900 animate-blur-fade-up relative"
            style={{ animationDelay: '350ms' }}
          >
            <span className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out ${open ? 'opacity-0 scale-50 -rotate-180' : 'opacity-100 scale-100 rotate-0'}`}>
              <Menu size={18} strokeWidth={1.6} />
            </span>
            <span className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out ${open ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-180'}`}>
              <X size={18} strokeWidth={1.6} />
            </span>
          </LiquidGlass>
        </div>
      </nav>

      {/* Мобильное меню */}
      <div
        className={`lg:hidden absolute top-[72px] left-3 right-3 z-40 transition-all duration-500 ease-out ${
          open ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0 pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        <div className="liquid-glass rounded-2xl p-3">
          <ul className="flex flex-col">
            {nav.map((link, i) => (
              <li
                key={link.href}
                className="transition-all duration-500 ease-out"
                style={{
                  transitionDelay: open ? `${i * 50}ms` : '0ms',
                  transform: open ? 'translateX(0)' : 'translateX(-12px)',
                  opacity: open ? 1 : 0,
                }}
              >
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 text-paper-900 text-[15px] rounded-lg hover:bg-paper-100 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}

function CartButton({ count }: { count: number }) {
  const onClick = () => {
    if (window.location.hash !== '#cart') {
      history.pushState(null, '', window.location.pathname + '#cart');
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    }
  };
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`подбор · ${count} ${count === 1 ? 'позиция' : 'позиций'}`}
      className="liquid-glass animate-blur-fade-up relative inline-flex items-center gap-2 rounded-full pl-3 pr-3.5 sm:pl-3.5 sm:pr-4 py-2 text-paper-900 text-[12.5px] hover:bg-white/[0.06] transition-colors duration-300"
      style={{ animationDelay: '300ms' }}
    >
      <ShoppingBag size={15} strokeWidth={1.6} />
      <span className="hidden sm:inline">подбор</span>
      <span className="font-mono tabular-nums text-[11px] bg-paper-900 text-paper-0 rounded-full min-w-[20px] h-[18px] px-1.5 inline-flex items-center justify-center">
        {count}
      </span>
    </button>
  );
}
