const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");

module.exports = {
    // entry 파일을 output에 있는 경로에 저장해준다
    entry: "./src/client/js/main.js",
    mode: 'development',
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/styles.css",
        }),
    ],
    output: {
        filename:"js/main.js",
        path: path.resolve(__dirname, "assets"),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [["@babel/preset-env", { targets: "defaults" }]],
                    },
                },
            },
            {
                test: /\.scss$/,
                // loader는 뒤에서 부터 실행됨
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],

            },
        ]
    }
};