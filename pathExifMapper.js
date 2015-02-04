var ExifImage = require('exif').ExifImage;
var errorCallbackHandler = require('./errorCallbackHandler');

String.prototype.endsWith = function (suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

function pathExifMapper(path, callback) {


    if (typeof path !== 'string') {
        return new Error("Path must be a string.");
    }
    if (!path.toLowerCase().endsWith('jpg')) {
        return new Error("Path must be a jpg.");
    }

    this.path = path;

    try {
        new ExifImage({
            image: path
        }, function (error, exifData) {

            errorCallbackHandler(error, callback(path, exifData));
        });

    } catch (error) {
        console.log('Error: ' + error.message);
    }

}
module.exports = pathExifMapper;