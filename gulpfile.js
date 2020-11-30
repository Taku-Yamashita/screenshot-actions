const gulp = require("gulp");
const webpackStream = require("webpack-stream");
const webpack = require("webpack");

const webpackConfig = require("./webpack.config");

gulp.task("default", () => {
    // ☆ webpackStreamの第2引数にwebpackを渡す☆
    return webpackStream(webpackConfig, webpack)
        .pipe(gulp.dest("dist"));
})

gulp.watch('src/*', gulp.task('default'))