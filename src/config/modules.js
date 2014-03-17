# 定义模块属性

var scanModules = require('../lib/scanModules');
var sourceModules = require ('./sourceModules');

// 默认的资源处理器
var processors = require('../lib/defaultProcessors');

// 默认的Asset处理器
var extendor = require('../lib/assetProcessors');

module.exports = [
    // 定义dep的模块划分
    {
        name: 'dep',
        src: '../dep',
        modules: scanModules('../dep'),
        processors: processors
    },
    
    // 定义源码的模块划分
    {
       name: 'source',
       src: './src',
       modules: sourceModules,
       processors: processors
    },
    
    // 定义library的模块划分
    {
       name: 'library',
       src: '../.../library',
       processors: processors
    }
];
