import { Reveal } from '../ui/Reveal';
import { hero } from '../../data/content';

// Минималистичный заголовок вместо большого Hero с видео:
// только название каталога, описание и быстрая навигация по разделам.
export function IntroHeader() {
  return (
    <section
      id="top"
      className="relative px-4 sm:px-6 md:px-12 pt-32 md:pt-40 pb-16 md:pb-24"
    >
      <div className="max-w-[1320px] mx-auto">
        <Reveal as="p" className="font-mono uppercase text-[11px] tracking-[0.22em] text-paper-500 mb-6">
          стоунхедж · каталог 2026 · москва и мо
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-end">
          <div className="md:col-span-8">
            <Reveal>
              <h1 className="display text-paper-900 text-[clamp(40px,7vw,96px)] leading-[0.96] mb-7">
                каталог надгробных <br className="hidden md:block" />сооружений
              </h1>
            </Reveal>
            <Reveal delay={120} as="p" className="text-paper-700 text-[15px] md:text-[17px] leading-relaxed max-w-[60ch]">
              {hero.description}
            </Reveal>
          </div>

          <Reveal delay={200} as="div" className="md:col-span-4">
            <div className="border border-paper-200 rounded-2xl p-5 md:p-6 bg-white">
              <p className="font-mono uppercase text-[10px] tracking-[0.18em] text-paper-500 mb-3">в каталоге</p>
              <p className="text-paper-700 text-[14px] leading-relaxed mb-4">
                стелы прямые · стелы полукруглые · цветники · подставки · могильные ограды
              </p>
              <a
                href="#catalog"
                className="inline-flex items-center gap-2 bg-paper-900 text-paper-0 rounded-full px-5 py-2.5 text-[13px] font-medium hover:bg-paper-700 transition-colors duration-300 ease-out"
              >
                28 позиций
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
