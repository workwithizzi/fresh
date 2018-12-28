/*
| '.eslintrc.js' contains only configs and integration settings with Prettier
*/

module.exports = {
	parser: 'babel-eslint',
	extends: ['prettier'],
	plugins: ['prettier'],
	rules: {
		'prettier/prettier': ['error']
	}
};
