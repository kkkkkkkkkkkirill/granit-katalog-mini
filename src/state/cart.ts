import { useEffect, useState, useCallback, useMemo } from 'react';
import { catalog, type CatalogItem } from '../data/content';

// Ключ хранилища меняется по версии сайта, чтобы три версии
// (тёмная / светлая / мини) не путали друг другу подборы.
const STORAGE_KEY = 'stonehedge.cart.mini.v1';
const STORAGE_EVT = 'stonehedge:cart-changed';

type CartMap = Record<string, number>; // sku → qty

function readStorage(): CartMap {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') return parsed as CartMap;
  } catch {}
  return {};
}

function writeStorage(map: CartMap) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    // Сообщаем другим хукам в этом же таб'е (storage event срабатывает только между таб'ами)
    window.dispatchEvent(new Event(STORAGE_EVT));
  } catch {}
}

export interface CartLineItem {
  item: CatalogItem;
  qty: number;
  lineTotal: number;
}

export function useCart() {
  const [map, setMap] = useState<CartMap>(() => readStorage());

  // Слушаем изменения от других экземпляров хука (другие компоненты)
  useEffect(() => {
    const onChange = () => setMap(readStorage());
    window.addEventListener(STORAGE_EVT, onChange);
    window.addEventListener('storage', onChange); // на случай других вкладок
    return () => {
      window.removeEventListener(STORAGE_EVT, onChange);
      window.removeEventListener('storage', onChange);
    };
  }, []);

  const items = useMemo<CartLineItem[]>(() => {
    return Object.entries(map)
      .map(([sku, qty]) => {
        const item = catalog.items.find((i) => i.sku === sku);
        if (!item) return null;
        return { item, qty, lineTotal: item.price * qty };
      })
      .filter((v): v is CartLineItem => v !== null)
      .sort((a, b) => a.item.no - b.item.no);
  }, [map]);

  const count = useMemo(
    () => items.reduce((s, li) => s + li.qty, 0),
    [items],
  );
  const total = useMemo(
    () => items.reduce((s, li) => s + li.lineTotal, 0),
    [items],
  );

  const add = useCallback((sku: string, qty = 1) => {
    const next = { ...readStorage() };
    next[sku] = (next[sku] || 0) + qty;
    writeStorage(next);
    setMap(next);
  }, []);

  const setQty = useCallback((sku: string, qty: number) => {
    const next = { ...readStorage() };
    if (qty <= 0) delete next[sku];
    else next[sku] = qty;
    writeStorage(next);
    setMap(next);
  }, []);

  const remove = useCallback((sku: string) => {
    const next = { ...readStorage() };
    delete next[sku];
    writeStorage(next);
    setMap(next);
  }, []);

  const clear = useCallback(() => {
    writeStorage({});
    setMap({});
  }, []);

  const has = useCallback((sku: string) => Boolean(map[sku] && map[sku] > 0), [map]);
  const qtyOf = useCallback((sku: string) => map[sku] || 0, [map]);

  return { items, count, total, add, setQty, remove, clear, has, qtyOf };
}
