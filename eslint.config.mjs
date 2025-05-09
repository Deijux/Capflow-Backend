import globals from 'globals'
import pluginJs from '@eslint/js'
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'

export default [
	{ files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
	{ languageOptions: { globals: globals.node } },
	pluginJs.configs.recommended,
	eslintPluginPrettier,
	{
		rules: {
			'capitalized-comments': ['error', 'always'],
		},
	},
]
