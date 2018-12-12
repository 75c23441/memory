const path = require('path')
const isProd = process.env.NODE_ENV === 'production'

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {

    baseUrl: isProd ? '../' : '/',

    outputDir: 'dist',

    assetsDir: 'static',

    // indexPath: 'page/colunm/index.html',
    indexPath: 'index.html',

    filenameHashing: true,

    lintOnSave: false,

    runtimeCompiler: true,

    devServer: {
        hot: true,
        compress: true,
        host: 'localhost',
        port: 23441,
        proxy: {
            '/account': {
                target: 'https://live.cgi.tripvivid.cn/',
                ws: true,
                secure: false,
                changeOrigin: true
            },
            '/live': {
                target: 'https://live.cgi.tripvivid.cn/',
                ws: true,
                secure: false,
                changeOrigin: true
            },
            '/code': {
                target: 'https://live.cgi.tripvivid.cn/',
                ws: true,
                secure: false,
                changeOrigin: true
            },
        }
    },

    css: {
        loaderOptions: {
            css: {
                // 这里的选项会传递给 css-loader
                extract: false,
                module: {
                    rules: [{
                        test: /\.scss$/,
                        use: [
                            'style-loader', // creates style nodes from JS strings
                            'css-loader', // translates CSS into CommonJS
                            'sass-loader' // compiles Sass to CSS, using Node Sass by default
                        ]
                    }]
                }
            },
            postcss: {
                // 这里的选项会传递给 postcss-loader
            }
        }
    },

    configureWebpack: (config) => {
        Object.assign(config, { // 开发生产共同配置
            resolve: {
                alias: {
                    '@': resolve('src'),
                    '@pages': resolve('src/pages'),
                    '@components': resolve('src/components'),
                    '@style': resolve('src/assets/style'),
                    '@img': resolve('src/assets/img'),
                    '@data': resolve('src/assets/data'),
                }
            }
        })
    },

    chainWebpack: (config) => {
        config.plugins.delete('fork-ts-checker');
        config.module
            .rule('ts')
            .use('ts-loader')
            .tap(options => {
                return {
                    ...options,
                    'transpileOnly': false,
                }
            });
    },
};
