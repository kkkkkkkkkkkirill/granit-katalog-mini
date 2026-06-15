export const nav = [
  { href: '#categories', label: 'направления' },
  { href: '#materials',  label: 'материалы' },
  { href: '#catalog',    label: 'каталог' },
];

export const hero = {
  videoSrc:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4',
  meta: [
    { icon: 'pin',      text: 'москва и московская область' },
    { icon: 'pen',      text: 'каталог из 28 позиций' },
  ],
  title: 'память в камне',
  description:
    'каталог надгробных сооружений из гранита «дядина гора» и «чарнокитовый». готовые конфигурации со стандартными размерами и фиксированной ценой.',
  ctaPrimary: 'смотреть каталог',
};

export const intro = {
  body: 'каждое изделие — это пропорция, материал и точность исполнения. размеры и комплектация в каталоге — стандартные.',
};

export const categories = {
  title: 'что в каталоге',
  intro:
    'надгробные сооружения двух фактур, в форматах от лаконичной стелы до полного комплекта с оградой. цена в каталоге — фиксированная, без ндс.',
  items: [
    { no: '01', title: 'стелы прямые',      text: 'строгая вертикаль, полированная фронтальная грань. ширина 50–60, толщина 5–8 см.' },
    { no: '02', title: 'стелы полукруглые', text: 'мягкое верхнее завершение, та же гамма размеров что у прямых.' },
    { no: '03', title: 'цветники',          text: 'трёхсторонняя рамка под подстилку или газон. размеры под комплект к стеле.' },
    { no: '04', title: 'подставки',         text: 'отдельный гранитный блок 50×20×15, 60×20×15 или 70×20×15.' },
    { no: '05', title: 'могильные ограды',  text: 'периметр участка из гранитных балок с фаской. набирается из элементов.' },
    { no: '06', title: 'мемориальные комплексы', text: 'единая композиция: стела, цветник, ограда. два типа гранита, фаска по периметру.' },
  ],
} as const;

// === КАТАЛОГ ИЗ PDF ===
// 28 позиций. Артикулы и цены — из «ГРАНИТ КАТАЛОГ.pdf». Фото
// перенесены в src/assets/catalog и привязаны по номеру позиции.
export type CatalogItem = {
  no: number;
  sku: string;
  title: string;
  description: string;
  size: string;
  stoneSlug: 'dyadina' | 'charnockite';
  kind: 'stela' | 'flowerbed' | 'set' | 'flowerbed-bevel';
  price: number;
};

export const catalog: { items: CatalogItem[] } = {
  items: [
    // — «дядина гора» —
    { no: 1,  sku: 'ДГ-1',   title: 'стела прямая, «дядина гора»',           description: 'комплект: стела прямая полированная + подставка',         size: '100×50×5 + 50×20×15',    stoneSlug: 'dyadina',     kind: 'stela',           price: 39080 },
    { no: 2,  sku: 'ДГЦ-1',  title: 'цветник к стеле, «дядина гора»',        description: '100×10×8 — 2 шт., 50×10×8 — 1 шт.',                      size: '100×10×8 + 50×10×8',     stoneSlug: 'dyadina',     kind: 'flowerbed',       price: 15308 },
    { no: 3,  sku: 'ДГ-2',   title: 'стела полукруглая, «дядина гора»',      description: 'комплект: стела полукруглая полированная + подставка',   size: '100×50×5 + 50×20×15',    stoneSlug: 'dyadina',     kind: 'stela',           price: 44145 },
    { no: 4,  sku: 'ДГ-3',   title: 'стела прямая, «дядина гора»',           description: 'комплект: стела прямая полированная + подставка',         size: '100×50×8 + 60×20×15',    stoneSlug: 'dyadina',     kind: 'stela',           price: 49078 },
    { no: 5,  sku: 'ДГЦ-3',  title: 'цветник к стеле, «дядина гора»',        description: '100×10×8 — 2 шт., 60×10×8 — 1 шт.',                      size: '100×10×8 + 60×10×8',     stoneSlug: 'dyadina',     kind: 'flowerbed',       price: 15907 },
    { no: 6,  sku: 'ДГ-4',   title: 'стела полукруглая, «дядина гора»',      description: 'комплект: стела полукруглая полированная + подставка',   size: '100×50×8 + 60×20×15',    stoneSlug: 'dyadina',     kind: 'stela',           price: 56316 },
    { no: 7,  sku: 'ДГ-5',   title: 'стела прямая, «дядина гора»',           description: 'комплект: стела прямая полированная + подставка',         size: '120×60×8 + 70×20×15',    stoneSlug: 'dyadina',     kind: 'stela',           price: 69521 },
    { no: 8,  sku: 'ДГЦ-5',  title: 'цветник к стеле, «дядина гора»',        description: '100×10×8 — 2 шт., 70×10×8 — 1 шт.',                      size: '100×10×8 + 70×10×8',     stoneSlug: 'dyadina',     kind: 'flowerbed',       price: 16509 },
    { no: 9,  sku: 'ДГ-6',   title: 'стела полукруглая, «дядина гора»',      description: 'комплект: стела полукруглая полированная + подставка',   size: '120×60×8 + 70×20×15',    stoneSlug: 'dyadina',     kind: 'stela',           price: 78238 },
    { no: 10, sku: 'ДГЦ-6',  title: 'цветник одиночный, «дядина гора»',      description: 'отдельный элемент',                                      size: '100×10×8',               stoneSlug: 'dyadina',     kind: 'flowerbed',       price: 7500 },

    // — «чарнокитовый» —
    { no: 11, sku: 'ЧК-1',   title: 'стела прямая, «чарнокитовый»',          description: 'комплект: стела прямая полированная + подставка',         size: '100×50×5 + 50×20×15',    stoneSlug: 'charnockite', kind: 'stela',           price: 39080 },
    { no: 12, sku: 'ЧКЦ-1',  title: 'цветник к стеле, «чарнокитовый»',       description: '100×10×8 — 2 шт., 50×10×8 — 1 шт.',                      size: '100×10×8 + 50×10×8',     stoneSlug: 'charnockite', kind: 'flowerbed',       price: 15308 },
    { no: 13, sku: 'ЧК-2',   title: 'стела полукруглая, «чарнокитовый»',     description: 'комплект: стела полукруглая полированная + подставка',   size: '100×50×5 + 50×20×15',    stoneSlug: 'charnockite', kind: 'stela',           price: 44145 },
    { no: 14, sku: 'ЧК-3',   title: 'стела прямая, «чарнокитовый»',          description: 'комплект: стела прямая полированная + подставка',         size: '100×50×8 + 60×20×15',    stoneSlug: 'charnockite', kind: 'stela',           price: 49078 },
    { no: 15, sku: 'ЧКЦ-3',  title: 'цветник к стеле, «чарнокитовый»',       description: '100×10×8 — 2 шт., 60×10×8 — 1 шт.',                      size: '100×10×8 + 60×10×8',     stoneSlug: 'charnockite', kind: 'flowerbed',       price: 15907 },
    { no: 16, sku: 'ЧК-4',   title: 'стела полукруглая, «чарнокитовый»',     description: 'комплект: стела полукруглая полированная + подставка',   size: '100×50×8 + 60×20×15',    stoneSlug: 'charnockite', kind: 'stela',           price: 56316 },
    { no: 17, sku: 'ЧК-5',   title: 'стела прямая, «чарнокитовый»',          description: 'комплект: стела прямая полированная + подставка',         size: '120×60×8 + 70×20×15',    stoneSlug: 'charnockite', kind: 'stela',           price: 69521 },
    { no: 18, sku: 'ЧКЦ-5',  title: 'цветник к стеле, «чарнокитовый»',       description: '100×10×8 — 2 шт., 70×10×8 — 1 шт.',                      size: '100×10×8 + 70×10×8',     stoneSlug: 'charnockite', kind: 'flowerbed',       price: 16509 },
    { no: 19, sku: 'ЧК-6',   title: 'стела полукруглая, «чарнокитовый»',     description: 'комплект: стела полукруглая полированная + подставка',   size: '120×60×8 + 70×20×15',    stoneSlug: 'charnockite', kind: 'stela',           price: 78238 },
    { no: 29, sku: 'ЧКЦ-6',  title: 'цветник одиночный, «чарнокитовый»',     description: 'отдельный элемент',                                      size: '100×10×8',               stoneSlug: 'charnockite', kind: 'flowerbed',       price: 7500 },

    // — Комплекты с оградой —
    { no: 31, sku: 'ДГ-7',   title: 'комплект с оградой, «дядина гора»',     description: 'периметр 170+150+20+35 см, толщина 12×15, фаска',         size: 'комплект из 11 элементов', stoneSlug: 'dyadina',     kind: 'set',             price: 167549 },
    { no: 32, sku: 'ЧК-7',   title: 'комплект с оградой, «чарнокитовый»',    description: 'периметр 170+150+20+35 см, толщина 12×15, фаска',         size: 'комплект из 11 элементов', stoneSlug: 'charnockite', kind: 'set',             price: 167549 },

    // — Цветники с фаской —
    { no: 33, sku: 'ДГЦ-6.1', title: 'цветник с фаской, «дядина гора»',      description: 'полировка 1/1/2 + фаска. 50×10×8 — 1 шт.',                size: '50×10×8',                stoneSlug: 'dyadina',     kind: 'flowerbed-bevel', price: 3279 },
    { no: 34, sku: 'ДГЦ-6.2', title: 'цветник с фаской, «дядина гора»',      description: 'полировка 1/1/2 + фаска. 60×10×8 — 1 шт.',                size: '60×10×8',                stoneSlug: 'dyadina',     kind: 'flowerbed-bevel', price: 3878 },
    { no: 35, sku: 'ДГЦ-6.3', title: 'цветник с фаской, «дядина гора»',      description: 'полировка 1/1/2 + фаска. 70×10×8 — 1 шт.',                size: '70×10×8',                stoneSlug: 'dyadina',     kind: 'flowerbed-bevel', price: 4480 },
    { no: 36, sku: 'ЧКЦ-6.1', title: 'цветник с фаской, «чарнокитовый»',     description: 'полировка 1/1/2 + фаска. 50×10×8 — 1 шт.',                size: '50×10×8',                stoneSlug: 'charnockite', kind: 'flowerbed-bevel', price: 3279 },
    { no: 37, sku: 'ЧКЦ-6.2', title: 'цветник с фаской, «чарнокитовый»',     description: 'полировка 1/1/2 + фаска. 60×10×8 — 1 шт.',                size: '60×10×8',                stoneSlug: 'charnockite', kind: 'flowerbed-bevel', price: 3878 },
    { no: 38, sku: 'ЧКЦ-6.3', title: 'цветник с фаской, «чарнокитовый»',     description: 'полировка 1/1/2 + фаска. 70×10×8 — 1 шт.',                size: '70×10×8',                stoneSlug: 'charnockite', kind: 'flowerbed-bevel', price: 4480 },
  ],
};

export const materials = {
  title: 'материалы',
  intro:
    'весь каталог — из двух фактур натурального гранита. оба материала твёрдые, износостойкие, не теряют тон со временем.',
  items: [
    {
      slug: 'dyadina',
      name: '«дядина гора»',
      sub: 'светло-серый волнистый',
      text: 'светло-серый гранит со сложным волнистым узором. живая фактура, индивидуальный рисунок каждой плиты.',
    },
    {
      slug: 'charnockite',
      name: '«чарнокитовый»',
      sub: 'тёмный с голубыми вкраплениями',
      text: 'тёмный гранит, почти чёрный после полировки. строгий тон, плотная структура с лёгкими голубыми кристаллами.',
    },
  ],
} as const;

export const footer = {
  tagline: 'каталог надгробных сооружений из гранита «дядина гора» и «чарнокитовый» — стелы, цветники, ограды.',
  bottom: '© стоунхедж, 2026. цены в каталоге без ндс. москва и московская область.',
};
