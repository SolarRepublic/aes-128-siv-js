/* eslint-disable @typescript-eslint/naming-convention */
const SX_ANSI_GREEN = '\x1b[32m';
const SX_ANSI_RESET = '\x1b[0m';
/* eslint-enable */

export function pass(s_test: string): void {
	// eslint-disable-next-line no-console
	console.log(`${SX_ANSI_GREEN}✓${SX_ANSI_RESET} ${s_test}`);
}

function error(s_test: string, ...a_args: Array<string | object>) {
	const a_rest = a_args.map(z => 'string' === typeof z? z: Object.entries(z).map(([si, w]) => `\n\t${si}: ${w}`).join('\n'));
	console.error(`${s_test}: ${a_rest.join('; ')}`);
}

export function fail(s_test: string, ...a_args: Array<string | object>): void {
	error(`❌ ${s_test}`, ...a_args);
}

export function caught(s_test: string, ...a_args: Array<string | object>): void {
	error(`💀 ${s_test}`, ...a_args);
}
