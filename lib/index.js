var internals = {};

exports.register = function (server, options, next) {

    //redirect / to the html dir
    var home = {
        handler: function (request, reply) {
            reply.redirect('/html');
        }
    };

    // directory mapping
    var html = {
        handler: {
            directory: {
                listing: true,
                index: false,
                path: __dirname + '/html'
            }
        }
    };
    var htmlview = {
        handler: function (request, reply) {
            var config = {
                slides: request.params.path
            };
            console.log(config);
            return reply.view('layout', config);
        }
    };
    var images = {
        handler: {
            directory: {
                listing: true,
                index: false,
                path: __dirname + '/images'
            }
        }
    };
    var css = {
        handler: {
            directory: {
                listing: false,
                index: false,
                path: __dirname + '/node_modules/hapi-reveal/node_modules/reveal.js/css'
            }
        }
    };
    var lib = {
        handler: {
            directory: {
                listing: false,
                index: false,
                path: __dirname + '/node_modules/hapi-reveal/node_modules/reveal.js/lib'
            }
        }
    };
    var js = {
        handler: {
            directory: {
                listing: false,
                index: false,
                path: __dirname + '/node_modules/hapi-reveal/node_modules/reveal.js/js'
            }
        }
    };
    var plugin = {
        handler: {
            directory: {
                listing: false,
                index: false,
                path: __dirname + '/node_modules/hapi-reveal/node_modules/reveal.js/plugin'
            }
        }
    };
    // routes
    server.route({
        method : 'GET',
        path : '/',
        config : home
    });
//    server.route({
//        method : 'GET',
//        path : '/html',
//        config : html
//    });
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
        helpersPath: __dirname + '/../../../helpers',
        engines: {
            html: require('handlebars')
        }
    });

    next();
};

exports.register.attributes = {

    pkg: require('../package.json')
};
