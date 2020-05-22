const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    fixBabelImports('antd', {
        libraryDirectory: 'es',
        style: 'css',
    }),
    // addLessLoader({
    //     ...{ // If you are using less-loader@5 please spread the lessOptions to options directly
    //         javascriptEnabled: true,
    //         modifyVars: {
    //             '@primary-color': '#5D8277',
    //             '@link-color': "#32322C"
    //         },
    //     },
    // }),
);