const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const dev = process.env.NODE_ENV !== 'production'


module.exports = {
	mode: dev ? 'development' : 'production',
	devtool: 'source-map',
	entry: './src/index.js',
	resolve: {
		extensions: ['*', '.js', '.jsx'],
		modules: [path.resolve('./src'), 'node_modules'],
	},
	devServer: {
		historyApiFallback: true,
		port: 8080,
		proxy: {
			'/api': 'http://localhost:4000',
		},
	},
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'bundle.js',
		publicPath: './',
	},
	module: {
		rules: [
            {
				test: /\.(jpg|png)$/,
				use: {
					loader: 'url-loader',
					options: {
						outputPath: 'img',
					},
				},
			},
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env', '@babel/preset-react'],
					plugins: ['@babel/plugin-transform-runtime', 'inline-react-svg'],
				},
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: 'babel-loader',
					},
					{
						loader: 'react-svg-loader',
						options: {
							jsx: true,
						},
					},
				],
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					'css-loader',
					'sass-loader',
				],
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {},
					},
					'css-loader',
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			hash: true,
			template: './src/index.html',
		}),
		new MiniCssExtractPlugin({
			filename: 'bundle.css?v=[chunkhash]',
		}),
	],
}
