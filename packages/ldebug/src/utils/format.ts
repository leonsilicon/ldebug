import { highlight } from 'cli-highlighter';
import prettyStringify from 'json-stringify-pretty-compact';
import zip from 'just-zip-it';

import type { CreateFormatOptions, FormatHelper } from '~/types/format.js';

export function createFormatHelper(options: CreateFormatOptions): FormatHelper {
	const stringify = (value: unknown) =>
		options.prettyStringify ? prettyStringify(value) : JSON.stringify(value);

	/**
		Returns the original string untouched if `options.highlight` is false
	*/
	const maybeHighlight = (...params: Parameters<typeof highlight>) =>
		options.highlight ? highlight(...params) : params[0];

	const format = (
		strings: TemplateStringsArray,
		...values: unknown[]
	): string => {
		let debugString = '';

		for (const [string, value] of zip(strings as unknown as string[], values)) {
			debugString += maybeHighlight(string);

			if (typeof value === 'object' && value !== null) {
				debugString += maybeHighlight(stringify(value), {
					language: 'json',
				});
			} else {
				debugString += maybeHighlight(String(value));
			}
		}

		debugString += strings[strings.length - 1]!;

		return debugString;
	};

	return format;
}
