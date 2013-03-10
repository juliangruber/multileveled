var rpc = require('rpc-stream');

var methods = ['get', 'put', 'put', 'del', 'range', 'find'];

module.exports = {
  client : client,
  server : server
};

function server (db) {
  return rpc(db);
}

function client () {
  var remote = rpc();
  var bound = remote.wrap(methods);

  methods.forEach(function (method) {
    remote[method] = bound[method];
  });

  return remote;
}
