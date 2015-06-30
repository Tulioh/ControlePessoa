exports.config = {
    capabilities: {
        'browserName': 'chrome' 
    },
    specs: [
        '../test/e2e/*.js'
    ],
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        isVerbose: true,
    },
    allScriptsTimeout: 20000,
};
