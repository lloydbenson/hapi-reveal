'use strict';

const Path = require('path');
const Code = require('@hapi/code');
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Lab = require('@hapi/lab');
const Vision = require('@hapi/vision');
const HapiReveal = require('../');


// Test shortcuts

const { describe, it } = exports.lab = Lab.script();
const expect = Code.expect;

describe('HapiReveal', () => {
/*
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
*/
});
