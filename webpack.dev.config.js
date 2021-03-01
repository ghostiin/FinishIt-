'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	target: 'web',
	entry: './src/index.tsx',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].js'
	},
	devtool: 'source-map',
	resolve: {
		extensions: [ '.ts', '.tsx', '.js', '.json' ]
	},
	mode: 'development',
	module: {
		rules: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			{ test: /\.tsx?$/, loader: 'awesome-typescript-loader' },

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
						loader: 'file-loader'
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css'
		})
		// new webpack.HotModuleReplacementPlugin()
	],
	//当使用cdn方式引入外部依赖的时候，可以通过external字段告诉webpack不要去打包在bundle里
	// externals: {
	// 	'react': 'React',
	// 	'react-dom': 'ReactDOM'
	// }
	// watch: true,
	watchOptions: {
		ignored: /node_modules/,
		aggregateTimeout: 300,
		poll: 1000
	},
	devServer: {
		contentBase: './dist',
		hot: true,
		open: true
	}
};
