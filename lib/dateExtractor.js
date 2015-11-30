function creationDateTime(exif) {
    if (!exif) {
        return new Error('No Exif Data (yet)!');
    }
    if (exif.gps) {
        if (exif.gps.GPSDateStamp && exif.gps.GPSTimeStamp) {
            return exif.gps.GPSDateStamp + ' ' + exif.gps.GPSTimeStamp;
        }
    }
    if (exif.image) {
        if (exif.image.CreateDate) {
            return exif.image.CreateDate;
        }

        if (exif.image.DateTimeOriginal) {
            return exif.image.DateTimeOriginal;
        }
        if (exif.image.ModifyDate) {
            return exif.image.ModifyDate;
        }
    }
    if (exif.exif) {
        if (exif.exif.CreateDate) {
            return exif.exif.CreateDate;
        }
    }
    return new Error('Not enough Exif data to determine date time');
};

module.exports = creationDateTime;