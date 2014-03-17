
/*#!/bin/bash

cd `dirname $0`
export ROOT_FOLDER=`pwd`
export OUTPUT=${ROOT_FOLDER}/output
export PROJECT_PATH=${ROOT_FOLDER}/phoenix
export TMP_PATH=${ROOT_FOLDER}/phoenix/output

rm ${TMP_PATH} -rf

[[ -d ${OUTPUT} ]] && mkdir ${OUTPUT}
[[ -d ${TMP_PATH} ]] && mkdir ${TMP_PATH}

if [ "$1" = "dev" ]; then
    edp config devtoggle true
    edp build -f --config=${PROJECT_PATH}/edp-build-config.js > buildlog
else
    edp config devtoggle false
    edp build -f --config=${PROJECT_PATH}/edp-build-config.js > buildlog
fi

rm -rf $OUTPUT
mkdir $OUTPUT
cp -r ${ROOT_FOLDER}/phoenix/output/* ${ROOT_FOLDER}/output
cd -
*/

var copyDir = require('lib/copyDir').copyDir;
var builder = require('edp-build');

exports.partition = function (modules) {
    modules.forEach(function (mod) {
        if (!mod.output) {
            return;
        }

        // 如果配置了asset，会直接读取asset文件夹
        if (mod.asset) {
            var target = mod.output + '/asset';
            copyDir(mod.asset, target, true);

            mod.asset = target;
        }

        if (mod.src) {
            var target = mod.output + '/src';
            copyDir(mod.src, target, true);
            mod.src = target;
        }
    });
    return modules;
};

exports.build = function (options) {
    this.context = option.context;
    var modules = options.modules;
    this.partition(modules);

    modules.forEach(function (mod) {
        exports.buildModule(mod);
    });
};

exports.buildModule = function (mod) {
    if (!mod.asset) {
        mod.asset = mod.output + '/asset';
        this.buildSource(mod);
    }

    this.buildAsset(mod);
};

exports.buildSource = function (mod, processor) {
    builder.build(mod.src, mod.asset, processor);
};

/**
 * buildAsset 主要是pathMapper, CDNReplacer, flagReplacer
 * 
 * @param  {[type]} mod [description]
 * @return {[type]}     [description]
 */
exports.buildAsset = function (mod, processor) {
    builder.build(mod.asset, processor);
};
