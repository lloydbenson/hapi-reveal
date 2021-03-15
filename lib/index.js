'use strict';

const Path = require('path');
const Handlebars = require('handlebars');

exports.plugin = {
  pkg: require('../package.json'),
  once: true,
  dependencies: ['@hapi/vision', '@hapi/inert'],
  register: async function (server, options) {

    const revealPath = Path.join(require.resolve('reveal.js'), '../../');

    //redirect / to the html dir
    const homeView = {
        handler: function (request, h) {
            return h.redirect('/html/index.html');
        }
    };

    const notesView = {
        handler: function (request, h) {

            return h.redirect('notes.html');
        }
    };
    const htmlView = {
        handler: function (request, h) {

            if (!request.params.path) {
                return h.redirect('/html/index.html');
            }
            const config = {
                filename: request.params.path.split('.html')[0]
            };
            return h.view('layout', config);
        }
    };
    // config
    const imagesCfg = {
        handler: {
            directory: {
                listing: true,
                index: false,
                //path: Path.join(Path.dirname(module.parent.id), 'images')
                path: './images'
            }
        }
    };
    const cssCfg = {
        handler: {
            directory: {
                listing: false,
                index: false,
                path: Path.join(revealPath, '/css')
            }
        }
    };
    const libCfg = {
        handler: {
            directory: {
                listing: false,
                index: false,
                path: Path.join(revealPath, '/lib')
            }
        }
    };
    const jsCfg = {
        handler: {
            directory: {
                listing: false,
                index: false,
                path: Path.dirname(require.resolve('reveal.js'))
            }
        }
    };
    const pluginCfg = {
        handler: {
            directory: {
                listing: false,
                index: false,
                path: Path.join(revealPath, '/plugin')
            }
        }
    };
    const distCfg = {
        handler: {
            directory: {
                listing: false,
                index: false,
                path: Path.join(revealPath, '/dist')
            }
        }
    };

    // routes
    server.route({
        method: 'GET',
        path: '/',
        config: homeView
    });

    server.route({
        method: 'GET',
        path: '/html/notes.html',
        config: notesView
    });
    server.route({
        method: 'GET',
        path: '/html/{path*}',
        config: htmlView
    });
    server.route({
        method: 'GET',
        path: '/css/{path*}',
        config: cssCfg
    });
    server.route({
        method: 'GET',
        path: '/images/{path*}',
        config: imagesCfg
    });
    server.route({
        method: 'GET',
        path: '/lib/{path*}',
        config: libCfg
    });
    server.route({
        method: 'GET',
        path: '/plugin/{path*}',
        config: pluginCfg
    });
    server.route({
        method: 'GET',
        path: '/dist/{path*}',
        config: distCfg
    });
    server.route({
        method: 'GET',
        path: '/js/{path*}',
        config: jsCfg
    });

    server.views({
        path: Path.join(__dirname, '../html'),
        //partialsPath: Path.join(Path.dirname(module.parent.id), 'html'),
        partialsPath: './html',
        helpersPath: Path.join(__dirname, '../helpers'),
        engines: {
            html: Handlebars
        }
    });
  }
};
