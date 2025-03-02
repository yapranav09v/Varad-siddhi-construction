const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: { 
        index: path.resolve(__dirname, 'src/index.js'),
        about: path.resolve(__dirname, 'src/about.js'),
        employe: path.resolve(__dirname, 'src/employe.js'),
        auth: path.resolve(__dirname, 'src/auth.js')
    },
    output: {
        path : path.resolve(__dirname, 'dist'),
        filename: '[name][contenthash].js',
        clean: true,
    },

    devtool: 'source-map',

    devServer:{
        static:{
            directory: path.resolve(__dirname, 'dist')
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },

    module:{
        rules:[
            {
                test: /\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico|mp4)$/i,
                use: [
                    {
                      loader:'file-loader',
                      options: {
                        name: '[name].[ext]',
                        publicPath: 'src/assets'
                      },
                    },
                  ],
            }
        ]
    },

    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/views/index.html'),
            inject: 'body',
            chunks: ['index']
        }),

        new htmlWebpackPlugin({
            filename: 'about.html',
            template: path.resolve(__dirname, 'src/views/about.html'),
            inject: 'body',
            chunks: ['about'],
        }),

        new htmlWebpackPlugin({
            filename: 'employe.html',
            template: path.resolve(__dirname, 'src/views/employe.html'),
            inject: 'body',
            chunks: ['employe', 'auth'],
        }),
        
        new CopyWebpackPlugin({
            patterns: [
              { from: 'src/assets', to: 'assets' }
            ]
          }),
    ]
}