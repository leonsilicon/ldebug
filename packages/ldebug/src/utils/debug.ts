import type { LazyDebugFunction } from '~/types/debug.js';
import type { CreateFormatOptions, FormatHelper } from '~/types/format.js';
import { createFormatHelper } from '~/utils/format.js';

interface CreateDebugProps extends Partial<CreateFormatOptions> {
	isDevelopment: boolean;
}

export function createDebug(props: CreateDebugProps): LazyDebugFunction {
	const defaultOptions: CreateFormatOptions = {
		highlight: true,
		prettyStringify: true,
	};
	const d = createFormatHelper({ ...defaultOptions, ...props });

	if (props.isDevelopment) {
		const debug = (cb: (d: FormatHelper) => string) => {
			console.debug(cb(d));
		};

		return debug;
	} else {
		return () => {
			/* noop */
		};
	}
}
