module.exports = function simpleConcatLimit (stream, limit, callback) {
  var chunks = []
  var bytesReceived = 0
  stream
    .on('data', function (chunk) {
      chunks.push(chunk)
      bytesReceived += chunk.length
      if (bytesReceived > limit) {
        stream.destroy()
        var limitError = new Error('limit')
        limitError.limit = limit
        finish(limitError)
      }
    })
    .once('error', function (error) {
      finish(error)
    })
    .once('end', function () {
      finish(null, Buffer.concat(chunks))
    })
  function finish (error, value) {
    if (callback) callback(error, value)
    callback = null
  }
}
