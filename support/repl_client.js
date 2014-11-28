var net = require('net')
 
var sock = net.connect(1337)
 
process.stdin.pipe(sock)
sock.pipe(process.stdout)
 
sock.on('connect', function () {
	process.stdin.setRawMode(true)
})
 
sock.on('close', function done () {
	process.stdin.setRawMode(false)
	sock.removeListener('close', done)
})
 
process.stdin.on('end', function () {
	sock.destroy()
	console.log("Session stopped")
})
 
