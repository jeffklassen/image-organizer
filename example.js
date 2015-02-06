var imageOrganizer = require('./index').ImageOrganizer;
var dateExtractor = require('./lib/dateExtractor');

var options = {

    srcDir: '/home/jeff/Pictures/singleton/',
    destDir: function (exifData) {
        var year
        try {
            year = dateExtractor(exifData).substr(0, 4);
        } catch (error) {
            console.log(error);
            year = '10000';

        }
        return '/home/jeff/Pictures/Pictures/' + year + '/CellPhonePics/';
    }
};



imageOrganizer(options);