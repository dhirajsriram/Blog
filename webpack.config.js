module.exports = {
    entry : [__dirname + '/app/index.js'],
    module: {
         rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            } ,
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader",
                }]
            }
        ],
    },
    output: {
        filename: 'bundle.js',
        path: __dirname + '/docs'
    }
}