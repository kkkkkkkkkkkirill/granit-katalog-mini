# СтоунХедж v2

Премиум-сайт мастерской: кинематографический monochrome-hero + редакционные секции.

## Запуск

```bash
npm install
npm run dev    # http://localhost:5174
```

## Что нового против v1

- Inter-only типографика (Cormorant убран — давал «AI-editorial» налёт).
- Кинематографический hero: фоновое видео с фильтром `grayscale`, нижняя blur-маска без затемнения, liquid-glass UI, blur-fade-up анимация.
- Liquid-glass переиспользуется в навбаре, в навигационных пилюлях и в форме контактов.
- Lucide-иконки вместо мелких inline-svg.
- Категории — редакционная сетка без карточек-контейнеров.
- Подход и процесс объединены в один narrative-блок.
- СБП-панель явно отмечена как demo, реальная интеграция отложена.

## Структура

```
src/
  App.tsx                       сборка одностраничного сайта
  main.tsx                      точка входа
  index.css                     liquid-glass, blur-fade-up, нижняя blur-маска
  data/content.ts               вся русская копия
  components/
    ui/                         LiquidGlass, Reveal, SectionHeading, Field
    layout/                     Navbar, Footer, MobileCTA
    hero/                       HeroSection (кинематографический)
    sections/                   Categories, Works, Approach, ProductsPayment, Materials, Faq, Contact
```
