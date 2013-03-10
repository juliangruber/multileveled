
# multileveled

Expose a [leveled](https://github.com/juliangruber/node-leveled) db over the network.

Synchronous methods are not exposed.

[![Build Status](https://travis-ci.org/juliangruber/multileveled.png?branch=master)](https://travis-ci.org/juliangruber/multileveled)

## Usage

```js
var multileveled = require('multileveled');

var leveled = require('leveled');
var _db = leveled(__dirname + '/db');

var net = require('net');
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
```

## API

### multileveled.server(db)

Create a rpc server for the leveled instance `db`.

Return a stream that is to be piped into client streams.

### var db = multileveled.client()

Return a stream that is to be piped into a server stream.

### db#put, db#get, db#del, db#find, db#range

See [leveled](https://github.com/juliangruber/node-leveled).

## Installation

```bash
$ npm install multileveled
```

## License

MIT
