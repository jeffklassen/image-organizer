var fs = require('fs');
var Jpg = require('./pathExifMapper');
var fileMover = require('./fileMover');

String.prototype.endsWith = function (suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};


function handleFiles(err, files, destDir, srcDir) {
    var dirList = files;
    var imageYearMap = [];

    for (var i = 0; i < dirList.length; i++) {


        var filename = srcDir + dirList[i];

        if (filename.toLowerCase().endsWith('jpg')) {

            try {
                var jpg = new Jpg(filename, function (srcImg, exifData) {
                    fileMover(srcImg, destDir, exifData);
                });

            } catch (error) {
                console.log(filename, error);
            }
        }
    }
};

function photoOrganizer(options) {

    if (options.srcDir && options.destDir) {
        fs.readdir(options.srcDir, function (err, files) {
            handleFiles(err, files, options.destDir, options.srcDir)
        });
    } else {
        throw new Error('Need both srcDir and destDir');
    }
};

module.exports = photoOrganizer;