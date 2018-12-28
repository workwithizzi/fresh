/*
| '.eslintrc.js' contains only configs and integration settings with Prettier
| '.prettierrc' contains all the rules for the formatting and styling
*/

module.exports = {
	parser: 'babel-eslint',
	extends: ['prettier'],
	plugins: ['prettier'],
	rules: {
		'prettier/prettier': ['error']
	}
};
