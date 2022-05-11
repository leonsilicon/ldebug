import process from 'node:process';
import { expect, test } from 'vitest';
import { spyOnImplementing } from 'vitest-mock-process';

// Needed to override `lionp` settings
process.env.FORCE_COLOR = '3';

// eslint-disable-next-line import/first
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

test('does not evaluate the callback in production', () => {
	const debug = createDebug({
		isDevelopment: false,
	});

	// @ts-expect-error: Won't be evaluated
	debug((f) => f`hello ${undefined!.error}`);
});
