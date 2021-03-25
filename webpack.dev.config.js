'use strict';

const glob = require('glob');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const SPA = true;
const setMPA = () => {
	const entry = {};
	const HtmlWebpackPlugins = [];

	const entryFiles = glob.sync(path.join(__dirname, './src/*/index.tsx'));

	Object.keys(entryFiles).map((index) => {
		const entryFile = entryFiles[index];
		// get page name
		const match = entryFile.match(/src\/(.*)\/index\.tsx/);
		const pageName = match && match[1];

		entry[pageName] = entryFile;
		HtmlWebpackPlugins.push(
			new HtmlWebpackPlugin({
				template: `./src/${pageName}/index.html`,
				chunks: [ pageName ],
				filename: `${pageName}.html`
			})
		);
	});
	return {
		entry,
		HtmlWebpackPlugins
	};
};

const { entry, HtmlWebpackPlugins } = SPA
	? {
			entry: './src/index.tsx',
			HtmlWebpackPlugins: [
				new HtmlWebpackPlugin({
					template: `./src/index.html`,
					filename: `index.html`
				})
			]
		}
	: setMPA();

module.exports = {
	target: 'web',
	entry: entry,
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].js'
	},
	devtool: 'source-map',
	resolve: {
		extensions: [ '.ts', '.tsx', '.js', '.json', '.css' ]
	},
	mode: 'development',
	module: {
		rules: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			{
				test: /\.tsx?$/,
				use: [
					'awesome-typescript-loader',
					{
						loader: 'astroturf/loader',
						options: { extension: '.module.scss' }
					} //* not good support ts & webpack5
				]
			},
			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{ enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
			{
				test: /\.(c|sa|sc)ss$/i,
				exclude: /node_modules/,
				use: [
					// {
					// 	loader: 'style-loader'
					// },
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: 'css-loader',
						options: {
							modules: true,
							importLoaders: 1
						}
					},
					{
						loader: 'postcss-loader'
					},
					{
						loader: 'sass-loader'
					}
				]
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: [
					{
						loader: 'file-loader'
					}
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		// new WorkboxPlugin.GenerateSW({
		// 	clientsClaim: true,
		// 	skipWaiting: true
		// }),
		...HtmlWebpackPlugins
		// new webpack.HotModuleReplacementPlugin()
	],
	//当使用cdn方式引入外部依赖的时候，可以通过external字段告诉webpack不要去打包在bundle里
	// externals: {
	// 	'react': 'React',
	// 	'react-dom': 'ReactDOM'
	// }
	watch: true,
	devServer: {
		// contentBase: './dist',
		// hot: true,
		// open: true,
		static: [ path.resolve(__dirname, 'dist') ],
		open: true,
		host: 'localhost',
		port: 4001
	},
	watchOptions: {
		ignored: /node_modules/,
		aggregateTimeout: 300,
		poll: 1000
	}
};
