var photoOrganizer = require('./lib/photoOrganizer');
var dateExtractor = require('./lib/dateExtractor');

var options = {

    srcDir: '/home/user/Pictures/InstantUpload/',
    destDir: function (exifData) {
        var year
        try {
            year = dateExtractor(exifData).substr(0, 4);
        } catch (error) {
            console.log(error);
            year = '10000';

        }
        return '/home/user/Pictures/Pictures/' + year + '/CellPhonePics/';
    }
};



photoOrganizer(options);