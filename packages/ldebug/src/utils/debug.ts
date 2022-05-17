import type { LazyDebugFunction } from '~/types/debug.js';
import type { CreateFormatOptions, FormatHelper } from '~/types/format.js';
import { createFormatHelper } from '~/utils/format.js';

interface CreateDebugProps extends Partial<CreateFormatOptions> {
	isDevelopment: boolean;
	logger?: (message: string) => void;
}

export function createDebug(props: CreateDebugProps): LazyDebugFunction {
	const defaultOptions: CreateFormatOptions = {
		highlight: true,
		prettyStringify: true,
	};
	const d = createFormatHelper({ ...defaultOptions, ...props });

	if (props.isDevelopment) {
		const { logger } = props;
		if (logger === undefined) {
			return (cb: (d: FormatHelper) => string) => {
				console.log(cb(d));
			};
		} else {
			return (cb: (d: FormatHelper) => string) => {
				logger(cb(d));
			};
		}
	} else {
		return () => {
			/* noop */
		};
	}
}
