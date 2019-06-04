const path = require('path');
const exec = require('child_process').exec;

function puts(error, stdout, stderr) {
    if (stdout != "") console.log(stdout);
}

function WebpackShellPlugin(options) {
    let defaultOptions = {
        onBuildStart: [],
        onBuildEnd: []
    };

    this.options = Object.assign(defaultOptions, options);
}

WebpackShellPlugin.prototype.apply = function (compiler) {
    const options = this.options;

    compiler.plugin("compilation", compilation => {
        if (options.onBuildStart.length) {
            console.log("Executing pre-build scripts");
            for (const script of options.onBuildStart) {
                exec(script, puts);
            }
        }
    });

    compiler.plugin("emit", (compilation, callback) => {
        if (options.onBuildEnd.length) {
            console.log("Executing post-build scripts");
            for (const script of options.onBuildEnd) {
                exec(script, puts);
            }
        }
        callback();
    });
};

const preInstall = [
    "rm -rf dist",
    "rm -rf target",
    "mkdir target",
];

const postInstall = [
    "echo executing post commands",
    "npx ./node_modules/.bin/babel --presets babel-preset-es2015-ie ./dist/OpenAudioMc.bundle.js -o ./target/OpenAudioMc.bundle.js",
    "cp -R ./src/libs ./target/libs/",
    "cp -R ./src/css ./target/css/",
    "cp -R ./src/assets ./target/assets/",
    "cp ./src/index.html ./target/index.html",
    "echo finished post commands",
];

module.exports = {
    mode: 'production',
    entry: {
        main: './src/js/OpenAudioMc.js',
    },
    output: {
        filename: (chunkData) => {
            return chunkData.chunk.name === 'main' ? 'OpenAudioMc.bundle.js' : '[name]/[name].js';
        },
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [new WebpackShellPlugin({
        onBuildStart: preInstall,
        onBuildEnd: postInstall
    })],
};
