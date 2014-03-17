// 默认的文件处理器列表
var moduleEntries = 'html,htm,phtml,tpl,vm,js';
var pageEntries = 'html,htm,phtml,tpl,vm';

module.exports = function () {
    return [ 
        new LessCompiler( {
            entryExtnames: pageEntries
        } ), 
        new CssCompressor(),
        new ModuleCompiler( {
            configFile: 'module.conf',
            entryExtnames: moduleEntries
        } ), 
        new JsCompressor(), 
        new PathMapper( {
            replacements: [
                { type: 'html', tag: 'link', attribute: 'href', extnames: pageEntries },
                { type: 'html', tag: 'img', attribute: 'src', extnames: pageEntries },
                { type: 'html', tag: 'script', attribute: 'src', extnames: pageEntries },
                { extnames: moduleEntries, replacer: 'module-config' }
            ],
            from: 'src',
            to: 'asset'
        } ) 
    ];
};