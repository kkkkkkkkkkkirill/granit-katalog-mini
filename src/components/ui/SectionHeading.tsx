import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  title: ReactNode;
  intro?: ReactNode;
  align?: 'left' | 'split';
}

// Без eyebrow-нумерации (это сильный AI-сигнал) — только заголовок
// и интро в split-композиции. Заголовок крупный, тонкий, тесная вёрстка.
export function SectionHeading({ title, intro, align = 'split' }: SectionHeadingProps) {
  if (align === 'left') {
    return (
      <header className="max-w-[64ch]">
        <Reveal>
          <h2 className="display text-[clamp(2.4rem,6vw,5rem)] text-paper-900 mb-6">{title}</h2>
        </Reveal>
        {intro && (
          <Reveal delay={80} as="p" className="text-paper-700 text-[15px] md:text-[17px] leading-relaxed">
            {intro}
          </Reveal>
        )}
      </header>
    );
  }
  return (
    <header className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-16 items-end">
      <Reveal as="div" className="md:col-span-8">
        <h2 className="display text-[clamp(2.4rem,6.5vw,5.5rem)] text-paper-900">{title}</h2>
      </Reveal>
      {intro && (
        <Reveal delay={80} as="div" className="md:col-span-4 md:pb-4">
          <p className="text-paper-700 text-[15px] md:text-[16px] leading-relaxed max-w-[42ch]">
            {intro}
          </p>
        </Reveal>
      )}
    </header>
  );
}
