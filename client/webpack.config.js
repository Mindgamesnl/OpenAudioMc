const webpack = require("webpack");
const path = require('path');

var exec = require('child_process').exec;

function puts(error, stdout, stderr) {
    console.log(stdout);
}

function WebpackShellPlugin(options) {
    var defaultOptions = {
        onBuildStart: [],
        onBuildEnd: []
    };

    this.options = Object.assign(defaultOptions, options);
}

WebpackShellPlugin.prototype.apply = function(compiler) {
    const options = this.options;

    compiler.plugin("compilation", compilation => {
        if(options.onBuildStart.length){
            console.log("Executing pre-build scripts");
            options.onBuildStart.forEach(script => exec(script, puts));
        }
    });

    compiler.plugin("emit", (compilation, callback) => {
        if(options.onBuildEnd.length){
            console.log("Executing post-build scripts");
            options.onBuildEnd.forEach(script => exec(script, puts));
        }
        callback();
    });
};

const preInstall = [
    "rm -rf dist"
];

const postInstall = [
    "finishing compile"
];

module.exports = {
    mode: 'production',
    entry: {
        main: './src/js/OpenAudioMc.js',
    },
    output: {
        filename: (chunkData) => {
            return chunkData.chunk.name === 'main' ? 'OpenAudioMc.bundle.js': '[name]/[name].js';
        },
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [

        ]
    },
    plugins: [new WebpackShellPlugin({
        onBuildStart: preInstall,
        onBuildEnd: postInstall
    })],
};
