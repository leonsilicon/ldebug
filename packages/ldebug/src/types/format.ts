export type FormatHelper = (
	strings: TemplateStringsArray,
	...values: unknown[]
) => string;

export interface CreateFormatOptions {
	highlight: boolean;
	prettyStringify: boolean;
}
