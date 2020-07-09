let nvaServer = require('nva-server')
let http = require('http')

process.chdir('dist')

let app = nvaServer({
  content: '.',
  asset: '.',
	rewrites: true,
  mock: { path: '../.nva/mock/*.*' }
})

let server = http.createServer(app).listen(9000)

module.exports = server
