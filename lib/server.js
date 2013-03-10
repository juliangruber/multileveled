var leveled = require('leveled');
var rpc = require('rpc-stream');

module.exports = function (db) {
  if ('string' == typeof db) db = leveled(db);
  return rpc(db);
}
