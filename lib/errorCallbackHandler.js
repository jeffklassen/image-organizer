function errorHandler(err, callback) {
    if (err) {
        console.log
    } else {
        if (callback && typeof callback === 'function') {
            callback();
        }
    }
};

module.exports = errorHandler;