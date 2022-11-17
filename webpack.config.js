const path = require('path');

module.exports = {
    entry: './src/asher.js',
    // mode: 'production',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        library: 'Asher',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        filename: 'bundle.js',
    },
};