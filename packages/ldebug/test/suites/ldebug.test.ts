import process from 'node:process';
import { expect, test, vi } from 'vitest';
import { mockConsoleLog } from 'vitest-mock-process';

// Needed to override `lionp` settings
process.env.FORCE_COLOR = '3';

// eslint-disable-next-line import/first
import { createDebug } from '~/index.js';

test('works', () => {
	const debug = createDebug({
		isDevelopment: true,
	});

	const mockLog = mockConsoleLog();

	debug((f) => f`hello ${['world']}`);

	expect(mockLog.mock.calls).toMatchSnapshot();
});

test('works with custom logger', () => {
	const logger = vi.fn(() => {
		/* noop */
	});
	const debug = createDebug({
		isDevelopment: true,
		logger,
	});

	debug(() => 'hello world');

	expect(logger).toBeCalledWith('hello world');
});

test('works without prettifying', () => {
	const debug = createDebug({
		isDevelopment: true,
		prettyStringify: false,
		highlight: false,
	});

	const mockLog = mockConsoleLog();

	debug((f) => f`hello ${['world']}`);

	expect(mockLog).toBeCalledWith('hello ["world"]');
});

test('does not evaluate the callback in production', () => {
	const debug = createDebug({
		isDevelopment: false,
	});

	// @ts-expect-error: Won't be evaluated
	debug((f) => f`hello ${undefined!.error}`);
});
