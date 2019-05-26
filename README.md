concatenate streams with size limits

```javascript
var concat = require('simple-concat-limit')
var fs = require('fs')
var assert = require('assert')

var firstStream = fs.createReadStream('index.js')
concat(firstStream, 1000 /* bytes */, function (error, buffer) {
  assert(!error, 'no error')
  assert(Buffer.isBuffer(buffer), 'yields buffer')
})

var secondStream = fs.createReadStream('index.js')
concat(firstStream, 100, function (error, buffer) {
  assert(error.message === 'limit', 'yields limit error')
})
```
