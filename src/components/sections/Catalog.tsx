import { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check, Minus } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { catalog, type CatalogItem } from '../../data/content';
import { useCart } from '../../state/cart';

// Загружаем все фото из assets/catalog
const photoModules = import.meta.glob<{ default: string }>(
  '../../assets/catalog/item-*.jpg',
  { eager: true },
);
const photoByNumber: Record<number, string> = {};
for (const [path, mod] of Object.entries(photoModules)) {
  const match = path.match(/item-(\d+)\.jpg$/);
  if (match) photoByNumber[parseInt(match[1], 10)] = mod.default;
}

type StoneFilter = 'all' | 'dyadina' | 'charnockite';
type KindFilter  = 'all' | 'stela' | 'flowerbed' | 'set';

const STONE_LABELS: Record<'dyadina' | 'charnockite', string> = {
  dyadina:     '«дядина гора»',
  charnockite: '«чарнокитовый»',
};

const KIND_LABELS: Record<CatalogItem['kind'], string> = {
  'stela':            'стела',
  'flowerbed':        'цветник',
  'flowerbed-bevel':  'цветник с фаской',
  'set':              'комплект с оградой',
};

function formatRub(n: number) {
  return new Intl.NumberFormat('ru-RU').format(n) + ' ₽';
}

export function Catalog() {
  const [stone, setStone] = useState<StoneFilter>('all');
  const [kind,  setKind]  = useState<KindFilter>('all');
  const [openItem, setOpenItem] = useState<CatalogItem | null>(null);
  const cart = useCart();

  const visible = useMemo(() => {
    return catalog.items.filter((p) => {
      if (stone !== 'all' && p.stoneSlug !== stone) return false;
      if (kind === 'all') return true;
      if (kind === 'stela')     return p.kind === 'stela';
      if (kind === 'flowerbed') return p.kind === 'flowerbed' || p.kind === 'flowerbed-bevel';
      if (kind === 'set')       return p.kind === 'set';
      return true;
    });
  }, [stone, kind]);

  // Блокировка скролла при открытом лайтбоксе
  useEffect(() => {
    if (!openItem) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpenItem(null); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [openItem]);

  return (
    <section
      id="catalog"
      className="relative px-6 md:px-10 py-24 md:py-32 border-t border-paper-200"
    >
      <div className="max-w-[1320px] mx-auto">
        <SectionHeading
          title="каталог"
          intro={`${catalog.items.length} позиций в наличии. цены без ндс, без доставки и монтажа.`}
        />

        {/* Фильтры */}
        <Reveal>
          <div className="mt-12 md:mt-14 flex flex-wrap items-center gap-3">
            <FilterGroup
              label="гранит"
              options={[
                { value: 'all',         label: 'все' },
                { value: 'dyadina',     label: '«дядина гора»' },
                { value: 'charnockite', label: '«чарнокитовый»' },
              ]}
              value={stone}
              onChange={(v) => setStone(v as StoneFilter)}
            />
            <span aria-hidden="true" className="h-6 w-px bg-paper-700 mx-1" />
            <FilterGroup
              label="тип"
              options={[
                { value: 'all',       label: 'все' },
                { value: 'stela',     label: 'стелы' },
                { value: 'flowerbed', label: 'цветники' },
                { value: 'set',       label: 'комплекты' },
              ]}
              value={kind}
              onChange={(v) => setKind(v as KindFilter)}
            />
            <span className="ml-auto font-mono text-[12px] text-paper-400">
              {visible.length} из {catalog.items.length}
            </span>
          </div>
        </Reveal>

        {/* Сетка */}
        <motion.div
          layout
          className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((item, idx) => {
              const inCart = cart.has(item.sku);
              const qty    = cart.qtyOf(item.sku);
              return (
                <motion.div
                  layout
                  key={item.sku}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.4, delay: Math.min(idx * 0.02, 0.3), ease: [0.16, 1, 0.3, 1] }}
                  className={`group relative bg-white/[0.02] border rounded-2xl overflow-hidden transition-colors duration-300 ease-out
                    ${inCart ? 'border-sand-500/60' : 'border-paper-200 hover:border-paper-300'}
                  `}
                >
                  {/* Сама карточка кликабельна и открывает лайтбокс */}
                  <button
                    type="button"
                    onClick={() => setOpenItem(item)}
                    className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sand-400"
                  >
                    <ItemPhoto item={item} />
                    <div className="p-4 md:p-5">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="font-mono text-[11px] tracking-wider text-sand-400 uppercase">{item.sku}</span>
                        <span className="font-mono text-[10px] text-paper-400">№{item.no}</span>
                      </div>
                      <h3 className="text-paper-900 text-[15px] md:text-[16px] leading-snug mb-2 max-w-[24ch]">
                        {item.title}
                      </h3>
                      <p className="text-paper-500 text-[12.5px] leading-relaxed mb-4 min-h-[2.5em]">
                        {item.size}
                      </p>
                      <div className="flex items-end justify-between gap-3">
                        <span className="text-paper-500 text-[12px]">{KIND_LABELS[item.kind]}</span>
                        <span className="font-display text-[18px] md:text-[20px] text-paper-900 tabular-nums">
                          {formatRub(item.price)}
                        </span>
                      </div>
                    </div>
                  </button>

                  {/* Кнопка «в подбор» поверх в правом верхнем углу */}
                  <AddPill
                    inCart={inCart}
                    qty={qty}
                    onAdd={() => cart.add(item.sku)}
                    onInc={() => cart.add(item.sku)}
                    onDec={() => cart.setQty(item.sku, qty - 1)}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Пустое состояние */}
        {visible.length === 0 && (
          <div className="mt-12 text-center py-16 border border-dashed border-paper-300 rounded-2xl">
            <p className="text-paper-500 text-[14px]">по выбранным фильтрам ничего не нашлось.</p>
            <button
              onClick={() => { setStone('all'); setKind('all'); }}
              className="mt-4 text-[13px] text-sand-400 hover:text-sand-300 underline underline-offset-4"
            >
              сбросить фильтры
            </button>
          </div>
        )}

        <p className="mt-10 text-center text-[12px] text-paper-400">
          нажмите на позицию, чтобы увидеть крупное фото и состав комплекта. кнопка «+» — добавить в подбор.
        </p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {openItem && (
          <Lightbox
            key={openItem.sku}
            item={openItem}
            onClose={() => setOpenItem(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─────────── мелкие компоненты ─────────── */

function AddPill({
  inCart, qty, onAdd, onInc, onDec,
}: {
  inCart: boolean;
  qty: number;
  onAdd: () => void;
  onInc: () => void;
  onDec: () => void;
}) {
  const stop = (e: React.MouseEvent) => { e.stopPropagation(); e.preventDefault(); };

  if (!inCart) {
    return (
      <button
        type="button"
        onClick={(e) => { stop(e); onAdd(); }}
        aria-label="в подбор"
        className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-paper-900 text-paper-0 flex items-center justify-center shadow-lg shadow-black/40 hover:scale-105 active:scale-95 transition-transform duration-150"
      >
        <Plus size={16} strokeWidth={2} />
      </button>
    );
  }
  return (
    <div
      className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 bg-sand-500/95 text-paper-0 rounded-full pl-1 pr-1 py-1 shadow-lg shadow-black/40"
      onClick={stop}
    >
      <button
        type="button"
        onClick={(e) => { stop(e); onDec(); }}
        className="w-7 h-7 rounded-full bg-black/15 hover:bg-black/25 flex items-center justify-center"
        aria-label="уменьшить количество"
      >
        <Minus size={14} strokeWidth={2} />
      </button>
      <span className="font-mono text-[12px] w-5 text-center tabular-nums" aria-live="polite">{qty}</span>
      <button
        type="button"
        onClick={(e) => { stop(e); onInc(); }}
        className="w-7 h-7 rounded-full bg-black/15 hover:bg-black/25 flex items-center justify-center"
        aria-label="увеличить количество"
      >
        <Plus size={14} strokeWidth={2} />
      </button>
    </div>
  );
}

function FilterGroup({
  label, options, value, onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-paper-500 mr-1">{label}</span>
      <div className="flex gap-1.5 flex-wrap">
        {options.map((opt) => {
          const active = opt.value === value;
          return (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={`relative px-3.5 py-1.5 text-[12.5px] rounded-full transition-colors duration-300 ease-out
                ${active
                  ? 'text-paper-0'
                  : 'text-paper-700 hover:text-paper-900 border border-paper-300 hover:border-paper-500'}
              `}
            >
              {active && (
                <motion.span
                  layoutId="catalog-filter-active"
                  className="absolute inset-0 rounded-full bg-paper-900"
                  transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                />
              )}
              <span className="relative">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ItemPhoto({ item }: { item: CatalogItem }) {
  const photo = photoByNumber[item.no];
  return (
    <div className="relative aspect-[4/5] bg-white/[0.03] overflow-hidden">
      {photo ? (
        <img
          src={photo}
          alt={`${item.sku} — ${item.title}`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <SilhouettePlaceholder kind={item.kind} stone={item.stoneSlug} />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/4 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }}
      />
      <span className="absolute top-3 left-3 font-mono text-[10px] tracking-wider uppercase bg-black/55 backdrop-blur-sm rounded-full px-2 py-0.5 text-white/90">
        {STONE_LABELS[item.stoneSlug]}
      </span>
    </div>
  );
}

function SilhouettePlaceholder({
  kind, stone,
}: {
  kind: CatalogItem['kind'];
  stone: CatalogItem['stoneSlug'];
}) {
  const bg = stone === 'dyadina'
    ? 'radial-gradient(70% 60% at 50% 40%, #5a5a5e 0%, #2a2a2e 60%, #14141a 100%)'
    : 'radial-gradient(70% 60% at 50% 40%, #2a2a2e 0%, #131316 60%, #07070a 100%)';
  return (
    <div className="absolute inset-0" style={{ background: bg }}>
      <svg viewBox="0 0 100 130" className="absolute inset-0 w-full h-full opacity-40">
        {kind === 'stela' && <rect x="34" y="20" width="32" height="90" rx="2" fill="#9c9ca5" />}
        {(kind === 'flowerbed' || kind === 'flowerbed-bevel') && (
          <g fill="none" stroke="#9c9ca5" strokeWidth="2">
            <rect x="20" y="60" width="60" height="40" />
            <rect x="24" y="64" width="52" height="32" />
          </g>
        )}
        {kind === 'set' && (
          <g fill="none" stroke="#9c9ca5" strokeWidth="2">
            <rect x="14" y="30" width="72" height="80" />
            <rect x="38" y="40" width="24" height="50" fill="#9c9ca5" />
          </g>
        )}
      </svg>
    </div>
  );
}

function Lightbox({ item, onClose }: { item: CatalogItem; onClose: () => void }) {
  const photo = photoByNumber[item.no];
  const cart = useCart();
  const qty  = cart.qtyOf(item.sku);
  const inCart = qty > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md px-4 py-10 md:px-10 md:py-16 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: 12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.98, opacity: 0, y: 6 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-[1100px] mx-auto bg-white border border-paper-200 rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-[1.4fr_1fr]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-paper-100 aspect-[4/5] md:aspect-auto md:min-h-[500px]">
          {photo ? (
            <img
              src={photo}
              alt={`${item.sku} — ${item.title}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <SilhouettePlaceholder kind={item.kind} stone={item.stoneSlug} />
          )}
        </div>

        <div className="p-6 md:p-8 lg:p-10 flex flex-col">
          <div className="flex items-baseline gap-3 mb-3">
            <span className="font-mono text-[11px] tracking-wider text-sand-400 uppercase">{item.sku}</span>
            <span className="font-mono text-[10px] text-paper-400">№{item.no}</span>
          </div>
          <h3 className="display text-paper-900 text-[clamp(22px,2.4vw,30px)] leading-[1.15] mb-5">
            {item.title}
          </h3>

          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-[13.5px] text-paper-700 mb-7">
            <dt className="text-paper-400">материал</dt><dd>{STONE_LABELS[item.stoneSlug]}</dd>
            <dt className="text-paper-400">тип</dt><dd>{KIND_LABELS[item.kind]}</dd>
            <dt className="text-paper-400">размеры</dt><dd className="font-mono text-paper-900">{item.size}</dd>
            <dt className="text-paper-400">состав</dt><dd className="leading-relaxed">{item.description}</dd>
          </dl>

          <div className="hairline mb-5" />

          <div className="flex items-end justify-between gap-4 mb-7">
            <div>
              <p className="font-mono text-[10px] tracking-wider text-paper-400 uppercase mb-1">цена</p>
              <p className="display text-paper-900 text-[clamp(26px,3vw,36px)] tabular-nums">
                {formatRub(item.price)}
              </p>
              <p className="text-[11px] text-paper-400 mt-1">без ндс, без доставки и монтажа</p>
            </div>
          </div>

          {/* Подбор: добавить / +/- если уже в подборе */}
          <div className="mt-auto flex flex-wrap items-center gap-3">
            {!inCart ? (
              <button
                onClick={() => cart.add(item.sku)}
                className="inline-flex items-center justify-center gap-2 bg-paper-900 text-paper-0 text-[13.5px] font-medium rounded-full pl-5 pr-6 py-3 hover:bg-sand-300 transition-colors duration-300 ease-out"
              >
                <Plus size={16} strokeWidth={2} />
                добавить в подбор
              </button>
            ) : (
              <>
                <div className="inline-flex items-center gap-1 bg-sand-500 text-paper-0 rounded-full pl-1 pr-1 py-1">
                  <button
                    type="button"
                    onClick={() => cart.setQty(item.sku, qty - 1)}
                    className="w-8 h-8 rounded-full bg-black/15 hover:bg-black/25 flex items-center justify-center"
                    aria-label="уменьшить"
                  >
                    <Minus size={14} strokeWidth={2} />
                  </button>
                  <span className="font-mono text-[14px] w-7 text-center tabular-nums">{qty}</span>
                  <button
                    type="button"
                    onClick={() => cart.add(item.sku)}
                    className="w-8 h-8 rounded-full bg-black/15 hover:bg-black/25 flex items-center justify-center"
                    aria-label="увеличить"
                  >
                    <Plus size={14} strokeWidth={2} />
                  </button>
                </div>
                <span className="inline-flex items-center gap-2 text-sand-300 text-[13px]">
                  <Check size={14} strokeWidth={2.2} />
                  в подборе · {formatRub(item.price * qty)}
                </span>
              </>
            )}
            <button
              onClick={onClose}
              className="text-paper-500 hover:text-paper-900 text-[13px] underline underline-offset-4 ml-auto"
            >
              закрыть
            </button>
          </div>
        </div>

        {/* X в углу */}
        <button
          onClick={onClose}
          aria-label="закрыть"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-paper-0/85 backdrop-blur-md border border-paper-300 text-paper-700 hover:text-paper-900 flex items-center justify-center"
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg>
        </button>
      </motion.div>
    </motion.div>
  );
}
