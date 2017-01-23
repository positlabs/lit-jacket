require('babel-register')({
	presets: ['preset-es2015'],
	plugins: ['transform-runtime']
});

require('./js/test.js');