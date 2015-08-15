var Apple = require('./apple')
var Snake = require('./snake')
var Clanvas = require('./clanvas')

function Game (width, height) {
  this.width = width
  this.height = height
  this.clanvas = new Clanvas(process.stdout, width, height, 'black')
  this.restart()
}

Game.prototype.restart = function () {
  this.snake = new Snake(this.clanvas)
  this.apple = new Apple(this.clanvas)
  this.points = 0
  this.apple.relocate(this.snake)
}

Game.prototype.render = function () {
  this.clanvas.clear()
  this.snake.render()
  this.apple.render()
  this.renderHud()
}

Game.prototype.renderHud = function () {
  var clanvas = this.clanvas
  var charm = clanvas.charm
  var middle = Math.round(this.width / 2)
  var end = this.width
  this.clanvas.fillLine(-1, 'white') // lazy hack, the whole area is shifted down to hold the hud
  charm.foreground('black')
  charm.position(middle - 3, 0).write('CLake')
  charm.foreground(4).position(end - 12, 0).write('Score: ' + this.points)
}

Game.prototype.onKey = function (key) {
  if (['left', 'right', 'up', 'down'].indexOf(key) !== -1) {
    this.snake.turn(key)
  }
  if (key === 'g') {
    this.snake.grow() // hmmmmmm
  }
}

Game.prototype.update = function () {
  var snake = this.snake
  this.colliding = false
  snake.move()
  if (snake.contains(this.apple.position)) {
    this.points++
    this.apple.relocate(snake)
    snake.grow()
  }

  if (snake.isCollidingWithSelf()) {
    this.restart()
  }
}

Game.prototype.exit = function () {
  this.clanvas.dispose()
}

module.exports = Game
