var rpc = require('rpc-stream');

var methods = ['get', 'put', 'put', 'del', 'range', 'find'];

module.exports = function () {
  var client = rpc();
  var remote = client.wrap(methods);

  methods.forEach(function (method) {
    client[method] = remote[method];
  });

  return client;
}
