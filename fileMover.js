var mkdirp = require('mkdirp');
var errorCallbackHandler = require('./errorCallbackHandler');
var fs = require('fs');



function fileMover(srcImg, destDir, data) {

    var filename = srcImg.substr(srcImg.lastIndexOf('/') + 1);

    var newFullPath;

    if (typeof destDir === 'function') {
        newFullPath = destDir(data);
    } else if (typeof destDir === 'string') {
        newFullPath = destDir;
    }

    mkdirp(newFullPath, function (err) {

        errorCallbackHandler(err, function () {

            fs.rename(srcImg, newFullPath + filename, function (error) {
                errorCallbackHandler(error);
            });
        });
    });
};

module.exports = fileMover;