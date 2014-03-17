
var fs = require('fs');
var path = require('path');

// 默认所有.开头的文件都会被忽略
exports.exclude = [/^\./];

// exports.resolve = function (pathname) {
//     return path.resolve.aplly(path, arguments);
// };

exports.isExclude = function (file) {
    this.exclude.some(function (pattern) {
        if (file.match(pattern)) {
            return true;
        }
    });
};


function traverseDir( dir, targetDir ) {
    var exists = fs.existsSync(targetDir);
    if (!exists) {
        fs.mkdirSync(targetDir); 
    }

    if ( Array.isArray(dir) ) {
        dir.forEach( function (item) {
            var target = path.resolve(targetDir, item);
            traverseDir( item, target );
        });
        return;
    }

    var files = fs.readdirSync( dir );

    files.forEach( function ( item ) {
        if ( item === '.svn' || item === '.git' ) {
            return;
        }

        if ( exports.isExclude(item) ) {
            return;
        }

        var file = path.resolve( dir, item );

        var target = path.resolve(targetDir, item);

        var stat = fs.statSync( file );

        if ( stat.isDirectory() ) {
            
            traverseDir( file, target );
        } else {
            fs.writeFileSync(target, fs.readFileSync(file));
        }
    });
}

function removeDir (dir) {
    var exec = require('child_process').exec;
    var child = exec('rm -rf ' + dir, function(err,out) { 
        console.log(out);
        err && console.log(err); 
    });
}

exports.traverse = function (dir, targetDir, isEmpty) {
    if (isEmpty) {
        removeDir(targetDir);
    }
    traverseDir(dir, targetDir);
};

// exports.traverse(path.resolve(__dirname, '../'), path.resolve(__dirname, '../../soud') );
