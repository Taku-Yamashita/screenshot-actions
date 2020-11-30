const path = require("path");

module.exports = {
    mode: "production",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js"
    },
    target: "node",
    node: false,
    externals: [/node_modules/, "bufferutil", "utf-8-validate"]
};