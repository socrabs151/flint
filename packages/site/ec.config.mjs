// @ts-check

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { transformerColorizedBrackets } from "@shikijs/colorized-brackets";
import ecTwoSlash from "expressive-code-twoslash";
import ts from "typescript";

/** @type {import('@astrojs/starlight/expressive-code').StarlightExpressiveCodeOptions} */
export default {
	plugins: [
		ecTwoSlash({
			twoslashOptions: {
				tsLibDirectory: dirname(ts.getDefaultLibFilePath({})),
				vfsRoot: fileURLToPath(new URL("../..", import.meta.url)),
				compilerOptions: {
					target: 99, // ESNext
					module: 199, // NodeNext
					moduleResolution: 99, // NodeNext
					jsx: 4, // react-jsx
					jsxImportSource: "react",
					noImplicitAny: false,
					// Override expressive-code-twoslash defaults which use friendly names
					// ("DOM", "ES2022") that don't work in the programmatic API — it needs
					// the file path format. esnext.full includes ES + DOM + DOM.Iterable.
					lib: ["lib.esnext.full.d.ts"],
				},
			},
		}),
	],
	shiki: {
		transformers: [
			transformerColorizedBrackets({
				// The package's night-owl presets, keyed by Starlight's bundled theme names.
				themes: {
					"Night Owl Light": [
						"#0431FA",
						"#319331",
						"#7B3814",
						"rgba(255, 18, 18, 0.8)",
					],
					"Night Owl No Italics": [
						"#FFD700",
						"#DA70D6",
						"#179FFF",
						"rgba(255, 18, 18, 0.8)",
					],
				},
			}),
		],
	},
};
