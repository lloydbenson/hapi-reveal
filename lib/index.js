var Fs = require('fs');
var internals = {};

exports.register = function (server, options, next) {

    //redirect / to the html dir
    var home = {
        handler: function (request, reply) {
            reply.redirect('/html/index.html');
        }
    };

    // directory mapping
    var html = {
        handler: {
            directory: {
                listing: true,
                index: false,
                path: __dirname + '/../../../html'
            }
        }
    };
    var htmlview = {
        handler: function (request, reply) {

            if (!request.params.path) {
                return reply.redirect('/html/index.html');
            }
            var config = {};
            config.filename = request.params.path.split('.html')[0];
/*
            try {
                config.slides = Fs.readFileSync(__dirname + '/../../../html/' + request.params.path, 'utf8');
            }
            catch (err) {
                console.log(request.params.path + ' does not exist');
            }
            //console.log(config);
*/
            return reply.view('layout', config);
        }
    };
    var images = {
        handler: {
            directory: {
                listing: true,
                index: false,
                path: __dirname + '/../../../images'
            }
        }
    };
    var css = {
        handler: {
            directory: {
                listing: false,
                index: false,
                path: __dirname + '/../node_modules/reveal.js/css'
            }
        }
    };
    var lib = {
        handler: {
            directory: {
                listing: false,
                index: false,
                path: __dirname + '/../node_modules/reveal.js/lib'
            }
        }
    };
    var js = {
        handler: {
            directory: {
                listing: false,
                index: false,
                path: __dirname + '/../node_modules/reveal.js/js'
            }
        }
    };
    var plugin = {
        handler: {
            directory: {
                listing: false,
                index: false,
                path: __dirname + '/../node_modules/reveal.js/plugin'
            }
        }
    };
    // routes
    server.route({
        method : 'GET',
        path : '/',
        config : home
    });
/*
    server.route({
        method : 'GET',
        path : '/html/{path*}',
        config : html
    });
*/
    server.route({
        method : 'GET',
        path : '/html/{path*}',
        config: htmlview
    });
    server.route({
        method : 'GET',
        path : '/css/{path*}',
        config : css
    });
    server.route({
        method : 'GET',
        path : '/images/{path*}',
        config : images
    });
    server.route({
        method : 'GET',
        path : '/lib/{path*}',
        config : lib
    });
    server.route({
        method : 'GET',
        path : '/plugin/{path*}',
        config : plugin
    });
    server.route({
        method : 'GET',
        path : '/js/{path*}',
        config : js
    });

    server.views({
        path: __dirname + '/../html',
        partialsPath: __dirname + '/../../../html',
        helpersPath: __dirname + '/../helpers',
        engines: {
            html: require('handlebars')
        }
    });

    next();
};

exports.register.attributes = {

    pkg: require('../package.json')
};
