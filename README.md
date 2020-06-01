concatenate streams with size limits

```javascript
var concat = require('simple-concat-limit')
var fs = require('fs')
var assert = require('assert')

var firstStream = fs.createReadStream('index.js')
concat(firstStream, 1000 /* bytes */, function (error, buffer) {
  assert(!error, 'no error')
  assert(Buffer.isBuffer(buffer), 'yields buffer')
  assert(buffer.length < 1000, 'less than limit')
})

var secondStream = fs.createReadStream('/dev/zero')
concat(secondStream, 100, function (error, buffer) {
  assert(error.message === 'limit', 'yields limit error')
  assert(secondStream.destroyed === true, 'destroyed')
})
```
