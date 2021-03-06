module.exports = {
	plugins: [
		require('autoprefixer'),
		require('postcss-preset-env')(/* pluginOptions */),
		require('postcss-nested'),
		require('postcss-px-to-viewport')({
			unitToConvert: 'px',
			viewportWidth: 375,
			unitPrecision: 5,
			propList: [ '*' ],
			viewportUnit: 'vw',
			fontViewportUnit: 'vw',
			selectorBlackList: [ 'novw-wrap' ],
			minPixelValue: 1,
			mediaQuery: false,
			replace: true,
			landscape: false,
			exclude: [ /node_modules/ ]
		}),
		require('postcss-normalize')(),
	]
};
