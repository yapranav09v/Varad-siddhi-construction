const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: { 
        index: path.resolve(__dirname, 'src/index.js'),
        about: path.resolve(__dirname, 'src/about.js'),
        auth: path.resolve(__dirname, 'src/auth.js'),
        database: path.resolve(__dirname, 'src/database.js'),
        project: path.resolve(__dirname, 'src/project.js'),
        // project: path.resolve(__dirname, 'src/career.js'),
        form: path.resolve(__dirname,'src/form.js'),
        career: path.resolve(__dirname, 'src/career.js'),
        team:path.resolve(__dirname, 'src/team.js'),
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
        port: 3002,
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
            template: path.resolve(__dirname, 'src/views/Home.html'),
            inject: 'body',
            chunks: ['index', 'database', 'auth','team']
        }),

        new htmlWebpackPlugin({
            filename: 'about.html',
            template: path.resolve(__dirname, 'src/views/about.html'),
            inject: 'body',
            chunks: ['about'],
        }),
        new htmlWebpackPlugin({
            filename: 'project.html',
            template: path.resolve(__dirname, 'src/views/project.html'),
            inject: 'body',
            chunks: ['project'],
        }),
        new htmlWebpackPlugin({
            filename: 'career.html',
            template: path.resolve(__dirname, 'src/views/career.html'),
            inject: 'body',
            chunks: ['career'],
        }),

        new htmlWebpackPlugin({
            filename: 'form.html',
            template: path.resolve(__dirname, 'src/views/form.html'),
            inject: 'body',
            chunks: ['form'],
        }),

        
        new CopyWebpackPlugin({
            patterns: [
              { from: 'src/assets', to: 'assets' }
            ]
          }),
    ]
}