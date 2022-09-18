/*
	本配置所需要的依赖包以及版本如下：
	"eslint": "^8.23.1",
    "eslint-config-xo": "^0.42.0",
    "eslint-config-xo-typescript": "^0.53.0",
    "eslint-plugin-vue": "^9.4.0",
	"@typescript-eslint/eslint-plugin": "^5.36.2",
    "@typescript-eslint/parser": "^5.36.2",
 */

module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		'plugin:vue/vue3-essential',
		'xo'
	],
	overrides: [
		{
			extends: [
				'xo-typescript'
			],
			files: [
				'*.ts',
				'*.tsx',
				// '*.vue'
			],
			rules: {
				/* 与ts相关的规则得在这里设置 */
				/* 尽量小的去改动，去学习比较普及的规范风格来写 */

				// Note: you must disable the base rule as it can report incorrect errors
				// 上面的Note是说: 必须先把基础规则先设置了，再设置@typescript-eslint规则，才能起效
				semi: [2, 'never'],
				'@typescript-eslint/semi': [2, 'never'],
				'no-unsafe-assignment': 'off',
				'@typescript-eslint/no-unsafe-assignment': 'off',
				'vue/multi-word-component-names': 'off',
				'comma-dangle': [2, 'never'],
				'@typescript-eslint/comma-dangle': [2, 'never']
			}
		}
	],
	parserOptions: {
		ecmaVersion: 'latest',
		parser: '@typescript-eslint/parser',
		sourceType: 'module'
	},
	plugins: [
		'vue',
		'@typescript-eslint'
	],
	rules: {
		'no-console': 'off',
		'import/no-unresolved': 'off',
		'import/extensions': 'off',
		'import/no-absolute-path': 'off',
		'import/no-extraneous-dependencies': 'off',
		'consistent-return': 'off',
		'vue/no-v-model-argument': 'off',
		'no-param-reassign': 'off',
		// 'no-shadow': 'off',
		'comma-dangle': 'off',
		'import/prefer-default-export': 'off',
		'vue/no-mutating-props': 'off',
		semi: [2, 'never'],
		'vue/multi-word-component-names': 'off',
		'capitalized-comments': 'off'
	}
}
