var multileveled = require('..');
var net = require('net');
var leveled = require('leveled');
var assert = require('assert');

var _db = leveled(__dirname + '/db');

net.createServer(function (c) {
  c.pipe(multileveled.server(_db)).pipe(c);
}).listen(9898);

var db = multileveled.client();
db.pipe(net.connect(9898)).pipe(db);

db.put('foo', 'bar', function (err) {
  if (err) throw err;
  db.get('foo', function (err, value) {
    if (err) throw err;
    assert(value == 'bar');
    console.log('success');
    process.exit(0);
  })
})
