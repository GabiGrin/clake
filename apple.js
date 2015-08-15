module.exports = Apple

function Apple (clanvas) {
  this.clanvas = clanvas
  this.position = {x: 0, y: 0}
  this.randomizeLocation()
}

Apple.prototype.randomizeLocation = function () {
  var clanvas = this.clanvas
  this.position = {
    x: Math.floor(Math.random() * clanvas.width),
    y: Math.floor(Math.random() * clanvas.height)
  }
}

Apple.prototype.relocate = function (snake) {
  while (snake.contains(this.position)) {
    this.randomizeLocation()
  }
}

Apple.prototype.render = function () {
  var pos = this.position
  this.clanvas.paintCell(pos.x, pos.y, 'red', this.clanvas.backgroundColor, '◉')
}
