import { Accessor, createRoot, createSignal, onCleanup, Setter, untrack } from 'solid-js';
const FALLBACK = Symbol('fallback');
function dispose(d: (() => void)[]) {
  for (let i = 0; i < d.length; i++) d[i]();
}
/**
 * reactively maps arrays by index instead of value - underlying helper for the `<Index>` control flow
 *
 * similar to `Array.prototype.map`, but gets the value as an accessor, transforms only changed items of the original arrays anew and returns an accessor.
 *
 * @description https://www.solidjs.com/docs/latest/api#indexarray
 */
export function indexArray<T, U>(
  list: Accessor<readonly T[] | undefined | null | false>,
  mapFn: (v: Accessor<T>, i: number) => U,
  options: { fallback?: Accessor<any> } = {},
): () => U[] {
  let items: (T | typeof FALLBACK)[] = [],
    mapped: U[] = [],
    disposers: (() => void)[] = [],
    signals: Setter<T>[] = [],
    len = 0,
    i: number;

  onCleanup(() => {
    console.log('indexArray cleanup');
    dispose(disposers);
  });
  return () => {
    const newItems = list() || [];
    return untrack(() => {
      debugger;
      // not
      if (newItems.length === 0) {
        if (len !== 0) {
          dispose(disposers);
          disposers = [];
          items = [];
          mapped = [];
          len = 0;
          signals = [];
        }
        if (options.fallback) {
          items = [FALLBACK];
          mapped[0] = createRoot((disposer) => {
            disposers[0] = disposer;
            return options.fallback!();
          });
          len = 1;
        }
        return mapped;
      }
      // not
      if (items[0] === FALLBACK) {
        disposers[0]();
        disposers = [];
        items = [];
        mapped = [];
        len = 0;
      }

      for (i = 0; i < newItems.length; i++) {
        if (i < items.length && items[i] !== newItems[i]) {
          signals[i](() => newItems[i]);
        } else if (i >= items.length) {
          mapped[i] = createRoot(mapper);
        }
      }
      for (; i < items.length; i++) {
        disposers[i]();
      }
      len = signals.length = disposers.length = newItems.length;
      items = newItems.slice(0);
      const foo = (mapped = mapped.slice(0, len));
      console.log(foo);
      // const foo = (mapped = mapped.slice(0, len));
      return mapped.slice(0, len);
    });
    function mapper(disposer: () => void) {
      console.log('run mapper');
      disposers[i] = disposer;
      const [s, set] = createSignal(newItems[i]);
      signals[i] = set;
      return mapFn(s, i);
    }
  };
}
