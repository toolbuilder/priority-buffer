require = require('esm')(module) // eslint-disable-line
// Not clear to me why I had to break up the following into two lines for things to work.
const imported = require('./src/priority-buffer.js')
module.exports = imported
