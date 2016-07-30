'use strict';

const Path = require('path');
const Handlebars = require('handlebars');
const Package = require('../package.json');


const internals = {};


exports.register = function (server, options, next) {

    //redirect / to the html dir
    const home = {
        handler: function (request, reply) {

            reply.redirect('/html/index.html');
        }
    };

    // directory mapping
    const html = {
        handler: {
            directory: {
                listing: true,
                index: false,
                path: Path.join(Path.dirname(module.parent.id), 'html')
            }
        }
    };
    const notesview = {
        handler: function (request, reply) {

            return reply('notes.html');
        }
    };
    const htmlview = {
        handler: function (request, reply) {

            if (!request.params.path) {
                return reply.redirect('/html/index.html');
            }
            const config = {
                filename: request.params.path.split('.html')[0]
            };
            return reply.view('layout', config);
        }
    };
    const images = {
        handler: {
            directory: {
                listing: true,
                index: false,
                path: Path.join(Path.dirname(module.parent.id), 'images')
            }
        }
    };
    const css = {
        handler: {
            directory: {
                listing: false,
                index: false,
                path: Path.join(require.resolve('reveal.js'), '..', '..', '/css')
            }
        }
    };
    const lib = {
        handler: {
            directory: {
                listing: false,
                index: false,
                path: Path.join(require.resolve('reveal.js'), '..', '..', '/lib')
            }
        }
    };
    const js = {
        handler: {
            directory: {
                listing: false,
                index: false,
                path: Path.dirname(require.resolve('reveal.js'))
            }
        }
    };
    const plugin = {
        handler: {
            directory: {
                listing: false,
                index: false,
                path: Path.join(require.resolve('reveal.js'), '..', '..', '/plugin')
            }
        }
    };
    const socketio = {
        handler: {
            directory: {
                listing: false,
                index: false,
                path: require.resolve('socket.io')
            }
        }
    };

    // routes
    server.route({
        method: 'GET',
        path: '/',
        config: home
    });

    server.route({
        method: 'GET',
        path: '/html/notes.html',
        config: notesview
    });
    server.route({
        method: 'GET',
        path: '/html/{path*}',
        config: htmlview
    });
    server.route({
        method: 'GET',
        path: '/css/{path*}',
        config: css
    });
    server.route({
        method: 'GET',
        path: '/images/{path*}',
        config: images
    });
    server.route({
        method: 'GET',
        path: '/lib/{path*}',
        config: lib
    });
    server.route({
        method: 'GET',
        path: '/plugin/{path*}',
        config: plugin
    });
    server.route({
        method: 'GET',
        path: '/js/{path*}',
        config: js
    });

    server.views({
        path: Path.join(__dirname, '../html'),
        partialsPath: Path.join(Path.dirname(module.parent.id), 'html'),
        helpersPath: Path.join(__dirname, '../helpers'),
        engines: {
            html: Handlebars
        }
    });

    next();
};

exports.register.attributes = {
    pkg: Package,
    dependencies: ['vision', 'inert']
};
