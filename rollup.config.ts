import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import {defineConfig} from 'rollup';
import filesize from 'rollup-plugin-filesize';

export default defineConfig({
	input: 'src/main.ts',
	output: {
		dir: 'dist',
		format: 'esm',
		entryFileNames: '[name].mjs',
	},
	plugins: [
		typescript({
			sourceMap: false,
			include: 'src/**.ts',
			compilerOptions: {
				allowImportingTsExtensions: false,
			},
		}),

		terser(),

		filesize(),
	],
});
