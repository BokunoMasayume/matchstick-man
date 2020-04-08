const path = require('path');

module.exports = {
    mode:"development",
    entry: './index.js',

    output:{
        filename: 'bundle.js',
        path: path.resolve(__dirname , './build')
    },

    // entry: './static/js/src/d3main.js',

    // output:{
    //     filename: 'bundle.js',
    //     path: path.resolve(__dirname , './static/js/d3build')
    // },


    module:{
        rules:[
            {
                test: /\.js$/,
                use:{
                    loader:"babel-loader",
                    options:{
                        presets:["@babel/preset-env"]
                    }
                },
                exclude:/node_modules/
            }
        ]
    },
};