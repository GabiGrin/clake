var Game = require('./game')
var size = require('window-size')
var keypress = require('keypress')
var argv = require('minimist')(process.argv.slice(2))

var game = new Game(size.width, size.height)
var speeds = {
  bullet: 45,
  fast: 30,
  normal: 15,
  slow: 7,
  snail: 2
}
var fps = speeds[argv.speed || 'normal']

keypress(process.stdin)

process.stdin.setRawMode(true)
process.stdin.resume()

process.stdin.on('keypress', function (ch, key) {
  if (key && key.ctrl && key.name === 'c') {
    game.exit()
    process.exit()
  }
  if (key && key.name) {
    game.onKey(key.name)
  }
})

setInterval(function () {
  game.update()
  game.render()
}, 1000 / fps)
