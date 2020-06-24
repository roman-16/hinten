import { action } from './src';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      store: Record<string, unknown>;
    }
  }
}

global.store = {
  count: 1,

  increment: action((state: { count: number }) => ({ count: state.count + 1 })),
  setCount: action((state: { count: number }, count: number) => ({ count })),

  sideMenu: {
    isOpen: false,
    maxItems: 100,

    toggle: action((state: { isOpen: boolean }) => ({ isOpen: !state.isOpen })),
    increment: action((state: { maxItems: number }) => ({ maxItems: state.maxItems + 1 })),

    child: {
      isExpanded: false,

      toggle: action((state: { isExpanded: boolean }) => ({ isExpanded: !state.isExpanded })),
    },
  },
};
