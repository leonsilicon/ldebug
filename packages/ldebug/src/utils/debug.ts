import type { CreateFormatOptions, FormatHelper } from '~/types/format.js';
import { createFormatHelper } from '~/utils/format.js';

interface CreateDebugProps extends Partial<CreateFormatOptions> {
	isDevelopment: boolean | (() => boolean);
}

export function createDebug(props: CreateDebugProps) {
	const defaultOptions: CreateFormatOptions = {
		highlight: true,
		prettyStringify: true,
	};
	const d = createFormatHelper({ ...defaultOptions, ...props });

	const debug = (cb: (d: FormatHelper) => string) => {
		const isDevelopment =
			typeof props.isDevelopment === 'boolean'
				? props.isDevelopment
				: props.isDevelopment();

		if (isDevelopment) {
			console.debug(cb(d));
		}
	};

	return debug;
}
