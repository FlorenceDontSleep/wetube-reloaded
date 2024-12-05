const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");

module.exports = {
    // entry 파일을 output에 있는 경로에 저장해준다
    entry: {
        main: "./src/client/js/main.js",
        videoPlayer: "./src/client/js/videoPlayer.js",
    },
    mode: 'development',
    // watch -> scss파일을 수정하면 자동으로 webpack을 실행시켜줌
    watch: true,
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/styles.css",
        }),
    ],
    output: {
        // [name] : entry에 있는 명칭으로 js 파일을 생성해준다.
        filename:"js/[name].js",
        path: path.resolve(__dirname, "assets"),
        // output 폴더를 build해주기 전에 clean 해주는 설정
        clean: true,
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