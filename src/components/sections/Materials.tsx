import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { materials } from '../../data/content';

import dyadinaImg     from '../../assets/materials/dyadina.jpg';
import charnockiteImg from '../../assets/materials/charnockite.jpg';

const materialPhotos: Record<string, string> = {
  dyadina:     dyadinaImg,
  charnockite: charnockiteImg,
};

// Две большие карточки с реальной фотографией текстуры каждого гранита.
export function Materials() {
  return (
    <section
      id="materials"
      className="relative px-6 md:px-12 py-24 md:py-36 border-t border-paper-300/30"
    >
      <div className="max-w-[1320px] mx-auto">
        <SectionHeading title={materials.title} intro={materials.intro} />

        <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {materials.items.map((item, idx) => (
            <Reveal key={item.slug} delay={idx * 100}>
              <article className="group rounded-2xl overflow-hidden border border-paper-300/30 bg-white">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={materialPhotos[item.slug]}
                    alt={`текстура гранита ${item.name}`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)' }}
                  />
                  <span className="absolute top-4 left-4 font-mono text-[10.5px] uppercase tracking-[0.18em] text-paper-900/85 bg-paper-0/45 backdrop-blur-sm rounded-full px-2.5 py-1">
                    0{idx + 1} · {item.sub}
                  </span>
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="display text-paper-900 text-[clamp(24px,2.6vw,32px)] leading-tight mb-3">
                    {item.name}
                  </h3>
                  <p className="text-paper-700 text-[14px] md:text-[15px] leading-relaxed max-w-[52ch]">
                    {item.text}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
