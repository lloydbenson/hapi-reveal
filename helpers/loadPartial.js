var Fs = require('fs');
var Handlebars = require('handlebars');
var Path = require('path');

module.exports = function (filename) {
    if (!Handlebars.partials[filename]) {
        Handlebars.registerPartial(filename, Fs.readFileSync(Path.join(require.resolve('reveal.js'), '../../') + filename).toString('utf8'));
    }
    return filename;
};
