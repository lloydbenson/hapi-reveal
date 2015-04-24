var Fs = require('fs');
var Handlebars = require('handlebars');

module.exports = function (filename) {

    if (!Handlebars.partials[filename]) {
        Handlebars.registerPartial(filename, Fs.readFileSync(filename));
    }
    return filename;
};

