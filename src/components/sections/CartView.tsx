import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Trash2, ArrowLeft, Copy, Check } from 'lucide-react';
import { useCart } from '../../state/cart';
import { type CatalogItem } from '../../data/content';

// Подгрузка фото каталога — те же самые что в Catalog.tsx
const photoModules = import.meta.glob<{ default: string }>(
  '../../assets/catalog/item-*.jpg',
  { eager: true },
);
const photoByNumber: Record<number, string> = {};
for (const [path, mod] of Object.entries(photoModules)) {
  const match = path.match(/item-(\d+)\.jpg$/);
  if (match) photoByNumber[parseInt(match[1], 10)] = mod.default;
}

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

function backToCatalog() {
  if (window.location.hash === '#cart') {
    history.pushState(null, '', window.location.pathname + '#catalog');
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }
}

export function CartView() {
  const cart = useCart();
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    const lines: string[] = ['подбор позиций — стоунхедж · каталог 2026', ''];
    for (const { item, qty, lineTotal } of cart.items) {
      lines.push(
        `${item.sku.padEnd(10)}  ${item.title}`,
        `             ${item.size}  ·  ${qty} шт.  =  ${formatRub(lineTotal)}`,
        '',
      );
    }
    lines.push(`итого: ${formatRub(cart.total)} (${cart.count} ед., без ндс)`);
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {}
  };

  return (
    <section className="relative min-h-screen px-4 md:px-10 pt-28 md:pt-36 pb-24 md:pb-32">
      <div className="max-w-[1100px] mx-auto">
        {/* Шапка */}
        <div className="flex items-center justify-between gap-4 mb-10 md:mb-12">
          <button
            type="button"
            onClick={backToCatalog}
            className="inline-flex items-center gap-2 text-white/70 hover:text-paper-900 text-[13.5px] transition-colors duration-200"
          >
            <ArrowLeft size={16} strokeWidth={1.6} />
            к каталогу
          </button>
          {cart.count > 0 && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm('очистить весь подбор?')) cart.clear();
              }}
              className="inline-flex items-center gap-2 text-paper-500 hover:text-paper-900 text-[12.5px] transition-colors duration-200"
            >
              <Trash2 size={14} strokeWidth={1.6} />
              очистить
            </button>
          )}
        </div>

        <p className="eyebrow mb-4">подбор позиций</p>
        <h1 className="display text-paper-900 text-[clamp(34px,5.5vw,64px)] leading-[0.98] mb-10 md:mb-14">
          {cart.count > 0
            ? <>выбрано <span className="tabular-nums">{cart.count}</span> {plural(cart.count, ['позиция','позиции','позиций'])}</>
            : <>в подборе пока пусто</>}
        </h1>

        {cart.items.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <ul className="flex flex-col gap-3 md:gap-4">
              <AnimatePresence initial={false}>
                {cart.items.map(({ item, qty, lineTotal }) => (
                  <motion.li
                    layout
                    key={item.sku}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-[80px_1fr_auto] md:grid-cols-[100px_1fr_auto_auto] items-center gap-4 md:gap-6 bg-white/[0.02] border border-paper-200 rounded-xl p-3 md:p-4"
                  >
                    {/* Фото */}
                    <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-white/[0.04]">
                      {photoByNumber[item.no] && (
                        <img
                          src={photoByNumber[item.no]}
                          alt={item.title}
                          className="absolute inset-0 w-full h-full object-cover"
                          loading="lazy"
                        />
                      )}
                    </div>

                    {/* Инфо */}
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                        <span className="font-mono text-[11px] tracking-wider text-sand-400 uppercase">{item.sku}</span>
                        <span className="font-mono text-[10px] text-paper-400">{STONE_LABELS[item.stoneSlug]}</span>
                      </div>
                      <h3 className="text-paper-900 text-[14.5px] md:text-[15.5px] leading-snug truncate mb-1">{item.title}</h3>
                      <p className="text-paper-500 text-[12.5px] leading-relaxed">
                        {item.size} · {KIND_LABELS[item.kind]} · {formatRub(item.price)}/шт.
                      </p>
                    </div>

                    {/* Количество */}
                    <div className="inline-flex items-center gap-1 bg-white/[0.05] border border-paper-200 rounded-full pl-1 pr-1 py-1">
                      <button
                        type="button"
                        onClick={() => cart.setQty(item.sku, qty - 1)}
                        className="w-8 h-8 rounded-full hover:bg-paper-200 text-paper-700 hover:text-paper-900 flex items-center justify-center transition-colors"
                        aria-label="уменьшить"
                      >
                        <Minus size={14} strokeWidth={2} />
                      </button>
                      <span className="font-mono text-[13px] w-6 text-center tabular-nums text-paper-900">{qty}</span>
                      <button
                        type="button"
                        onClick={() => cart.add(item.sku)}
                        className="w-8 h-8 rounded-full hover:bg-paper-200 text-paper-700 hover:text-paper-900 flex items-center justify-center transition-colors"
                        aria-label="увеличить"
                      >
                        <Plus size={14} strokeWidth={2} />
                      </button>
                    </div>

                    {/* Сумма + удалить */}
                    <div className="col-span-3 md:col-span-1 flex items-center justify-between gap-3 md:flex-col md:items-end md:gap-2">
                      <span className="font-display text-[20px] md:text-[22px] text-paper-900 tabular-nums">
                        {formatRub(lineTotal)}
                      </span>
                      <button
                        type="button"
                        onClick={() => cart.remove(item.sku)}
                        className="text-paper-400 hover:text-red-300 transition-colors p-1"
                        aria-label="убрать из подбора"
                        title="убрать"
                      >
                        <Trash2 size={15} strokeWidth={1.6} />
                      </button>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            {/* Итог */}
            <div className="mt-10 md:mt-12 border-t border-paper-200 pt-8">
              <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
                <div>
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-paper-500 mb-2">
                    итого по подбору
                  </p>
                  <p className="display text-paper-900 text-[clamp(36px,5vw,56px)] tabular-nums leading-none">
                    {formatRub(cart.total)}
                  </p>
                  <p className="text-paper-400 text-[12.5px] mt-2">
                    {cart.count} {plural(cart.count, ['единица','единицы','единиц'])} · без ндс, без доставки и монтажа
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={onCopy}
                    className="inline-flex items-center gap-2 bg-paper-900 text-paper-0 rounded-full pl-5 pr-6 py-3 text-[13.5px] font-medium hover:bg-sand-300 transition-colors duration-300"
                  >
                    {copied ? <Check size={16} strokeWidth={2} /> : <Copy size={16} strokeWidth={1.8} />}
                    {copied ? 'скопировано' : 'скопировать список'}
                  </button>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 border border-paper-300 text-paper-900 rounded-full px-5 py-3 text-[13.5px] hover:border-paper-500 transition-colors duration-300"
                  >
                    распечатать
                  </button>
                </div>
              </div>

              <p className="text-paper-400 text-[12.5px] leading-relaxed max-w-[60ch]">
                это служебный лист подбора. передайте его мастеру вместе с пожеланиями
                по доставке, монтажу и гравировке — он подготовит итоговое коммерческое
                предложение и согласует сроки.
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function EmptyState() {
  return (
    <div className="border border-dashed border-paper-300 rounded-2xl p-10 md:p-16 text-center">
      <p className="text-paper-700 text-[15px] mb-2">
        отмечайте интересные позиции прямо в каталоге кнопкой «+».
      </p>
      <p className="text-paper-400 text-[13px] mb-7">
        подбор сохраняется между визитами — можно вернуться к нему позже.
      </p>
      <button
        type="button"
        onClick={backToCatalog}
        className="inline-flex items-center gap-2 bg-paper-900 text-paper-0 rounded-full pl-5 pr-6 py-3 text-[13.5px] font-medium hover:bg-sand-300 transition-colors duration-300"
      >
        <ArrowLeft size={16} strokeWidth={2} />
        к каталогу
      </button>
    </div>
  );
}

function plural(n: number, forms: [string, string, string]) {
  const n10 = n % 10;
  const n100 = n % 100;
  if (n10 === 1 && n100 !== 11) return forms[0];
  if (n10 >= 2 && n10 <= 4 && (n100 < 10 || n100 >= 20)) return forms[1];
  return forms[2];
}
