'use strict';

const Path = require('path');
const Code = require('code');
const Hapi = require('hapi');
const Inert = require('inert');
const Lab = require('lab');
const Vision = require('vision');
const HapiReveal = require('../');


// Test shortcuts

const lab = exports.lab = Lab.script();
const it = lab.it;
const expect = Code.expect;


it('can be registered with hapi', (done) => {
  const serverConfig = {
    connections: {
      routes: {
        files: {
          relativeTo: Path.join(__dirname, '..')
        }
      }
    }
  };
  const server = new Hapi.Server(serverConfig);
  server.connection();
  server.register([Inert, Vision, HapiReveal], (err) => {
    expect(err).to.not.exist();
    done();
  });
});

it('can return reveal css', (done) => {
  const serverConfig = {
    connections: {
      routes: {
        files: {
          relativeTo: Path.join(__dirname, '..')
        }
      }
    }
  };
  const server = new Hapi.Server(serverConfig);
  server.connection();
  server.register([Inert, Vision, HapiReveal], (err) => {
    expect(err).to.not.exist();
    server.inject('/css/reveal.css', (res) => {
      expect(res.statusCode).to.equal(200);
      done();
    })
  });
});
