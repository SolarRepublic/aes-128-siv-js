
/**
 * UTF-8 encodes the given text to an Uint8Array.
 * @param s_text text to encode
 * @returns UTF-8 encoded Uint8Array
 */
export function text_to_buffer(s_text: string): Uint8Array {
	return new TextEncoder().encode(s_text);
}


/**
 * UTF-8 decodes the given Uint8Array to text.
 * @param atu8_text UTF-8 encoded data to decode
 * @returns text
 */
export function buffer_to_text(atu8_text: Uint8Array): string {
	return new TextDecoder().decode(atu8_text);
}


/**
 * Converts the given base64-encoded string to a buffer, then UTF-8 decodes it.
 * @param sx_buffer input base64-encoded string
 * @returns text
 */
export function base64_to_text(sx_buffer: string): string {
	return buffer_to_text(base64_to_buffer(sx_buffer));
}


/**
 * UTF-8 encodes the given text, then converts it to a base64-encoded string.
 * @param s_text text to encode
 * @returns output base64-encoded string
 */
export function text_to_base64(s_text: string): string {
	return buffer_to_base64(text_to_buffer(s_text));
}


// cache function reference
const sfcc = String.fromCharCode;

/**
 * Converts the given buffer to a hex string format in lowercase.
 * @param atu8_buffer input buffer
 * @returns output hex string
 */
export function buffer_to_hex(atu8_buffer: Uint8Array): string {
	let sx_hex = '';
	for(const xb_byte of atu8_buffer) {
		sx_hex += xb_byte.toString(16).padStart(2, '0');
	}

	return sx_hex;
}


/**
 * Converts the given hex string into a buffer.
 * @param sx_hex input hex string
 * @returns output buffer
 */
export function hex_to_buffer(sx_hex: string): Uint8Array {
	const nl_hex = sx_hex.length;
	if(0 !== nl_hex % 2) throw new Error(`Invalid hex string length is not a multiple of 2`);
	const nb_buffer = nl_hex / 2;
	const atu8_buffer = new Uint8Array(nb_buffer);
	for(let i_byte=0; i_byte<nb_buffer; i_byte++) {
		atu8_buffer[i_byte] = parseInt(sx_hex.slice(i_byte+i_byte, i_byte+i_byte+2), 16);
	}

	return atu8_buffer;
}


/**
 * Converts the given buffer to a base64-encoded string.
 * @param atu8_buffer input buffer
 * @returns output base64-encoded string
 */
export function buffer_to_base64(atu8_buffer: Uint8Array): string {
	return globalThis.btoa(buffer_to_string8(atu8_buffer));
}


/**
 * Converts the given base64-encoded string to a buffer.
 * @param sx_buffer input base64-encoded string
 * @returns output buffer
 */
export function base64_to_buffer(sx_buffer: string): Uint8Array {
	return string8_to_buffer(globalThis.atob(sx_buffer));
}


/**
 * Converts the given buffer to a UTF-8 friendly compact string.
 * @param atu8_buffer input buffer
 * @returns output string
 */
export function buffer_to_string8(atu8_buffer: Uint8Array): string {
	// benchmarks indicate string building performs better than array map/join
	let sx_buffer = '';
	for(const xb_byte of atu8_buffer) {
		sx_buffer += sfcc(xb_byte);
	}

	return sx_buffer;
}


/**
 * Converts the given UTF-8 friendly compact string to a buffer.
 * @param sx_buffer input string
 * @returns output buffer
 */
export function string8_to_buffer(sx_buffer: string): Uint8Array {
	const nl_pairs = sx_buffer.length;
	const atu8_buffer = new Uint8Array(nl_pairs);
	for(let i_read=0; i_read<nl_pairs; i_read++) {
		atu8_buffer[i_read] = sx_buffer.charCodeAt(i_read);
	}

	return atu8_buffer;
}
