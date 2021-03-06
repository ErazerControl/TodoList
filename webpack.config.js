const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const ExtractPlugin = require('extract-text-webpack-plugin')
const isDev= process.env.NODE_ENV === 'development'
const config = {
    mode: 'development',
    entry:path.join(__dirname, 'src/index.js'),
    output:{
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, 'dist')
    },
    module:{
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test:/\.jsx$/,
                loader: 'babel-loader'
            },
            {test:/\.(gif|jpg|jpeg|png|svg)$/,
                use:[{
                    loader: 'url-loader',
                    options: {
                        // 图片大小小于1024就转为base64,从而减少http请求
                        limit: 1024,
                        name: '[name].[ext]'
                    }
                }]
            }
           
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV: isDev? '"development"':'"production"'
            }
        }),
        new HTMLPlugin()
      ]
}

if(isDev){
    config.module.rules.push( {
        test: /\.styl(us)?$/,
        use: [
            'style-loader',
            'css-loader',
            {
                loader:'postcss-loader',
                options: {
                    sourceMap: true,
                }
            },
            'stylus-loader'
        ]
    })
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
        port:8000,
        host:'0.0.0.0',
        overlay: {
            errors: true
        },
        hot:true
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}
else{
    config.output.filename = '[name].[chunkhash:8].js'
    config.module.rules.push({
        test: /\.styl(us)?$/,
        use: ExtractPlugin.extract({
            fallback: 'style-loader',
            use: [
                'css-loader',
                {
                    loader:'postcss-loader',
                    options: {
                        sourceMap: true,
                    }
                },
                'stylus-loader'
            ]
        })
    })
    config.plugins.push(
        new ExtractPlugin('style.[hash:8].css')
    )
}
module.exports = config