module.exports = {
	paths: {
		css: {
			files: 'assets/sass/**/**/*.{sass,scss}',
			source: 'assets/sass',
			target: '../resources/css'
		},
		js: {
			files: 'assets/js/**/**/*.js',
			target: '../resources/js',
			essentials: {
				files: 'assets/js/libs/**/*.js'
			},
			main: {
				files: 'assets/js/**/**/*.js'
			}
		},
		fonts: {
			files: 'assets/svg/*.svg',
			target: '../resources/fonts'
		}
	}
};