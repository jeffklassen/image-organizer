var fs = require('fs');
var pathExifMapper = require('path-exif-mapper').PathExifMap;
var fileMover = require('./fileMover');

/*

photoOrganizer does some rudimentary validation of the options object, then
enumerates the srcDir.

handleFiles (probably needs to be renamed), gets the directory enumeration 
and creates a map of the src image path and the exif data.

This map is passed to fileMover along with destDir string/callback

*/

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
                pathExifMapper(filename, function (srcImg, exifData) {
                    fileMover(srcImg, destDir, exifData);
                });

            } catch (error) {
                console.log(filename, error);
            }
        }
    }
};

function imageOrganizer(options) {

    if (options.srcDir && options.destDir) {
        fs.readdir(options.srcDir, function (err, files) {
            handleFiles(err, files, options.destDir, options.srcDir)
        });
    } else {
        throw new Error('Need both srcDir and destDir');
    }
};

module.exports = imageOrganizer;