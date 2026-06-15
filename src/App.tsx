import { useEffect, useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { IntroHeader } from './components/sections/IntroHeader';
import { Categories } from './components/sections/Categories';
import { Materials } from './components/sections/Materials';
import { Catalog } from './components/sections/Catalog';
import { CartView } from './components/sections/CartView';

type View = 'catalog' | 'cart';

function resolveView(): View {
  return window.location.hash === '#cart' ? 'cart' : 'catalog';
}

export function App() {
  const [view, setView] = useState<View>(() =>
    typeof window === 'undefined' ? 'catalog' : resolveView(),
  );

  useEffect(() => {
    const onHash = () => {
      setView(resolveView());
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return (
    <div className="bg-paper-0 text-paper-900 min-h-screen">
      <Navbar />
      <main>
        {view === 'cart' ? (
          <CartView />
        ) : (
          <>
            <IntroHeader />
            <Categories />
            <Materials />
            <Catalog />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
