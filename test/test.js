var multileveled = require('..');
var net = require('net');
var leveled = require('leveled');
var test = require('tap').test;

test('multileveled', function (t) {
  var _db = leveled(__dirname + '/db');

  var server = net.createServer(function (c) {
    c.pipe(multileveled.server(_db)).pipe(c);
  })
  server.listen(9898);

  var db = multileveled.client();
  var con = net.connect(9898);
  db.pipe(con).pipe(db);

  db.put('foo', 'bar', function (err) {
    t.notOk(err);
    db.get('foo', function (err, value) {
      t.notOk(err);
      t.equal(value, 'bar');
      t.end();

      con.destroy();
      server.close();
    })
  })
});

