import {webcrypto} from 'node:crypto';

import {buffer_to_base64, buffer_to_hex, hex_to_buffer} from '@solar-republic/belt';

import {pass, fail} from './helper';
import {aes_cmac_init, aes_key} from '../src/aes';

if(!globalThis.crypto) globalThis.crypto = webcrypto;


const SB16_KEY_0 = '2b7e151628aed2a6abf7158809cf4f3c';
const SB16_KEY_1 = '603deb1015ca71be2b73aef0857d77811f352c073b6108d72d9810a30914dff4';

const A_CMAC_VECTORS = [
	{
		key: SB16_KEY_0,
		message: '',
		tag: 'bb1d6929e95937287fa37d129b756746',
	},
	{
		key: SB16_KEY_0,
		message: '6bc1bee22e409f96e93d7e117393172a',
		tag: '070a16b46b4d4144f79bdd9dd04a287c',
	},
	{
		key: SB16_KEY_0,
		message: '6bc1bee22e409f96e93d7e117393172aae2d8a571e03ac9c9eb76fac45af8e5130c81c46a35ce411',
		tag: 'dfa66747de9ae63030ca32611497c827',
	},
	{
		key: SB16_KEY_0,
		message: '6bc1bee22e409f96e93d7e117393172aae2d8a571e03ac9c9eb76fac45af8e5130c81c46a35ce411e5fbc1191a0a52eff69f2445df4f9b17ad2b417be66c3710',
		tag: '51f0bebf7e3b9d92fc49741779363cfe',
	},
	{
		key: SB16_KEY_1,
		message: '',
		tag: '028962f61b7bf89efc6b551f4667d983',
	},
	{
		key: SB16_KEY_1,
		message: '6bc1bee22e409f96e93d7e117393172a',
		tag: '28a7023f452e8f82bd4bf28d8c37c35c',
	},
	{
		key: SB16_KEY_1,
		message: '6bc1bee22e409f96e93d7e117393172aae2d8a571e03ac9c9eb76fac45af8e5130c81c46a35ce411',
		tag: 'aaf3d8f1de5640c232f5b169b9c911e6',
	},
	{
		key: SB16_KEY_1,
		message: '6bc1bee22e409f96e93d7e117393172aae2d8a571e03ac9c9eb76fac45af8e5130c81c46a35ce411e5fbc1191a0a52eff69f2445df4f9b17ad2b417be66c3710',
		tag: 'e1992190549f6ed5696a2c056c315410',
	},
];

for(const [i_vector, g_vector] of A_CMAC_VECTORS.entries()) {
	const atu8_key = hex_to_buffer(g_vector.key);
	const atu8_message = hex_to_buffer(g_vector.message);
	const atu8_tag_expect = hex_to_buffer(g_vector.tag);

	const d_key = await aes_key(atu8_key, 'AES-CBC');

	const f_cmac = await aes_cmac_init(d_key);
	const atu8_tag_actual = await f_cmac(atu8_message);

	const b_test = buffer_to_base64(atu8_tag_expect) === buffer_to_base64(atu8_tag_actual);

	const s_test = `AES-CMAC Test Vector #${i_vector+1}`;

	if(b_test) {
		pass(s_test);
	}
	else {
		fail(s_test, 'Tag mismatch', {
			actual: buffer_to_hex(atu8_tag_actual),
			expect: buffer_to_hex(atu8_tag_expect),
		});
	}
}
