module.exports = function simpleConcatLimit (stream, limit, callback) {
  var chunks = []
  var bytesReceived = 0
  stream
    .on('data', function (chunk) {
      chunks.push(chunk)
      bytesReceived += chunk.length
      if (bytesReceived > limit) {
        chunks = null
        var limitError = new Error('limit')
        limitError.limit = limit
        stream.destroy(limitError)
      }
    })
    .once('error', function (error) {
      finish(error)
    })
    .once('end', function () {
      finish()
    })

  var finished = false
  function finish (error) {
    /* istanbul ignore if */
    if (finished) return
    finished = true
    if (error) callback(error)
    else callback(null, Buffer.concat(chunks))
  }
}
