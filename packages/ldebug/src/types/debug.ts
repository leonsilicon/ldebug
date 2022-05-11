import type { FormatHelper } from '~/types/format.js';

export type LazyDebugFunction = (cb: (f: FormatHelper) => string) => void;
