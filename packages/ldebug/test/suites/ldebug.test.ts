import { expect, test } from 'vitest';
import { spyOnImplementing } from 'vitest-mock-process';

import { createDebug } from '~/index.js';

test('works', () => {
	const debug = createDebug({
		isDevelopment: true,
	});

	const mockDebug = spyOnImplementing(console, 'debug', () => {
		/* noop */
	});

	debug((f) => f`hello ${['world']}`);

	expect(mockDebug.mock.calls).toMatchSnapshot();
});

test('works without prettifying', () => {
	const debug = createDebug({
		isDevelopment: true,
		prettyStringify: false,
		highlight: false,
	});

	const mockDebug = spyOnImplementing(console, 'debug', () => {
		/* noop */
	});

	debug((f) => f`hello ${['world']}`);

	expect(mockDebug).toBeCalledWith('hello ["world"]');
});
