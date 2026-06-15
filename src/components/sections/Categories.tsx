import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { categories } from '../../data/content';

// Без карточек. Чистая редакционная сетка: номер + название + текст
// в две колонки. Разделители — hairline. Hover: лёгкая подсветка
// и стрелка справа.
export function Categories() {
  return (
    <section
      id="categories"
      className="relative px-6 md:px-12 pt-28 md:pt-44 pb-24 md:pb-32"
    >
      <div className="max-w-[1320px] mx-auto">
        <SectionHeading title={categories.title} intro={categories.intro} />

        <ul className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 md:gap-x-16 border-t border-paper-300/30">
          {categories.items.map((item, i) => (
            <Reveal
              as="li"
              key={item.no}
              delay={i * 60}
              className="group border-b border-paper-300/30"
            >
              <a
                href="#catalog"
                className="grid grid-cols-[auto_1fr_auto] gap-5 md:gap-8 items-baseline py-7 md:py-9"
              >
                <span className="font-mono text-[12px] text-paper-900/40 tabular-nums">
                  {item.no}
                </span>
                <span>
                  <h3 className="display text-[clamp(22px,2.4vw,30px)] text-paper-900 leading-[1.1] mb-2 group-hover:text-paper-900 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-paper-700 text-[14px] md:text-[15px] leading-relaxed max-w-[48ch]">
                    {item.text}
                  </p>
                </span>
                <span
                  aria-hidden="true"
                  className="self-center text-paper-900/40 group-hover:text-paper-900 group-hover:translate-x-1 transition-all duration-500 ease-out"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
