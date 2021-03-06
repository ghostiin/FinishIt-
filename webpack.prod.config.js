'use strict';

const glob = require('glob');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
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

// const { entry, HtmlWebpackPlugins } = setMPA();
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
// console.log(entry);
// console.log(HtmlWebpackPlugins);

module.exports = {
	// entry: './src/index.tsx',
	entry: entry,
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name]_[chunkhash:8].js'
	},
	devtool: 'source-map',
	resolve: {
		extensions: [ '.ts', '.tsx', '.js', '.json' ]
	},
	mode: 'production',
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
					}
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
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name]_[hash:8][ext]'
						}
					}
				]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		// new HtmlWebpackPlugin({
		// 	template: './src/index.html'
		// }),
		new MiniCssExtractPlugin({
			filename: '[name]_[contenthash:8].css'
		}),
		new WorkboxPlugin.GenerateSW({
			clientsClaim: true,
			skipWaiting: true
		}),
		...HtmlWebpackPlugins
	],
	//当使用cdn方式引入外部依赖的时候，可以通过external字段告诉webpack不要去打包在bundle里
	// externals: {
	// 	'react': 'React',
	// 	'react-dom': 'ReactDOM'
	// }
	// watch: true,
	// watchOptions: {
	// 	ignored: /node_modules/,
	// 	aggregateTimeout: 300,
	// 	poll: 1000
	// },
	// devServer: {
	// 	contentBase: './dist',
	// 	hot: true
	// }
	optimization: {
		minimizer: [
			new CssMinimizerPlugin({
				parallel: true, // 可省略，默认开启并行
				sourceMap: true, // 可省略，默认遵循webpack的devtool配置
				minimizerOptions: {
					preset: 'advanced' // 需额外安装
				}
			})
		]
	}
};
