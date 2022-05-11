# ldebug

[![npm version](https://img.shields.io/npm/v/ldebug)](https://npmjs.com/package/ldebug)

A debugging utility that evaluates messages lazily.

## Usage

```typescript
import { createDebug } from 'ldebug';
import process from 'node:process';

const debug = createDebug({
  isDevelopment: process.env.NODE_ENV !== 'production',
  highlight: true,
  prettyStringify: true,
});

// The following line will log "Hello ['world']" with colors in development and do nothing in production (the template string won't be evaluated either).
debug((f) => f`Hello ${['world']}`);
```

## API

### createDebug(options)

Returns: [`LazyDebugFunction`](#lazydebugfunction)

Creates a new debug function with the given options.

#### options.isDevelopment

Type: `boolean`\
Required: `true`

A boolean representing whether or not the application is running in development. If the application is not running in the development, `createDebug` will return a no-op function.

#### options.highlight

Type: `boolean`\
Default: `true`

Highlights the messages using [cli-highlighter](https://github.com/leonzalion/cli-highlighter).

#### options.prettyStringify

Type: `boolean`\
Default: `true`

If true, uses [json-stringify-pretty-compact] to stringify objects. Otherwise, uses `JSON.stringify()`.

### LazyDebugFunction

Type: `(callback: (format: FormatHelper) => string) => void`

#### callback

The callback (only called in development) that returns the message to log.

#### format

Type: `FormatHelper`

```typescript
export type FormatHelper = (
  strings: TemplateStringsArray,
  ...values: unknown[]
) => string;
```

A format helper ES6 template tag that applies transformations like formatting for certain non-string values (e.g. objects) when turning them strings.
