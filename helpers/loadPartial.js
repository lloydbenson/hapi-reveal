var Fs = require('fs');
var Handlebars = require('handlebars');

module.exports = function (filename) {

    console.log(filename);
    console.log(typeof filename);
    if (!Handlebars.partials[filename]) {
        Handlebars.registerPartial(filename, Fs.readFileSync(filename));
    }
    return filename;
};

