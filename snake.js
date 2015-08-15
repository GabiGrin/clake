var lerp = require('lerp')

var directions = {
  left: {
    vx: -1,
    vy: 0
  },
  right: {
    vx: 1,
    vy: 0
  },
  up: {
    vx: 0,
    vy: -1
  },
  down: {
    vx: 0,
    vy: 1
  }
}

module.exports = Snake

function Snake (clanvas) {
  this.clanvas = clanvas
  var initialSize = 7
  this.cells = Array.apply(null, Array(initialSize))
    .map(function (_, idx) {
      return {
        x: idx,
        y: 0,
        dir: 'down'
      }
    }).reverse()
  this.direction = directions.down
  this.turningEnabled = true
}

Snake.prototype.turn = function (dir) {
  var newDir = directions[dir]
  var currentDir = this.direction
  var isOppositeDirection = newDir.vx && currentDir.vx || newDir.vy && currentDir.vy
  if (this.turningEnabled && !isOppositeDirection) {
    this.direction = directions[dir]
    this.turningEnabled = false
    this.cells[0].dir = dir
  }
}

Snake.prototype.moveHead = function () {
  var head = this.cells[0]
  var rb = this.clanvas.width
  var bb = this.clanvas.height
  head.x += this.direction.vx
  head.y += this.direction.vy
  if (head.x > rb) head.x = 0
  if (head.x < 0) head.x = rb
  if (head.y > bb) head.y = 0
  if (head.y < 0) head.y = bb
}

Snake.prototype.contains = function (pos) {
  return this.cells.filter(function (cell) {
    return cell.x === pos.x && cell.y === pos.y
  }).length > 0
}

Snake.prototype.isCollidingWithSelf = function () {
  var cells = this.cells
  var head = cells[0]
  for (var i = 1; i < cells.length; i++) {
    var cell = cells[i]
    if (cell.x === head.x && cell.y === head.y) {
      return i
    }
  }
  return false
}

Snake.prototype.grow = function () {
  var lastCell = this.cells[this.cells.length - 1]
  this.cells.push({
    x: lastCell.x,
    y: lastCell.y,
    dir: lastCell.dir
  })
}

Snake.prototype.move = function () {
  this.cells = this.cells.map(function (cell, idx) {
    var newCell = idx ? this.cells[idx - 1] : cell
    return {
      x: newCell.x,
      y: newCell.y,
      dir: newCell.dir
    }
  }.bind(this))
  this.moveHead()
  this.turningEnabled = true
}

Snake.prototype.render = function () {
  var edges = ['◥', '◤', '◣', '◢']
  // var edges = ['◹', '◸', '◺', '◿']
  var clanvas = this.clanvas
  this.cells.forEach(function (cell, idx, cells) {
    var g = lerp(120, 200, idx / cells.length)
    var char = ' '
    var bg = clanvas.backgroundColor
    var fg = rgb(25, g, 10)
    var nextCell = cells[idx + 1] || cell
    var tx = cell.dir[0] + nextCell.dir[0]
    switch (tx) {
      case 'rd':
      case 'ul':
        char = edges[0]
        break
      case 'ru':
      case 'dl':
        char = edges[3]
        break
      case 'ld':
      case 'ur':
        char = edges[1]
        break
      case 'lu':
      case 'dr':
        char = edges[2]
        break
      default:
        bg = fg
        break
    }
    clanvas.paintCell(cell.x, cell.y, fg, bg, char)
  })
}

function rgb (r, g, b) {
  var red = r / 255 * 5
  var green = g / 255 * 5
  var blue = b / 255 * 5
  return rgb5(red, green, blue)
}

function rgb5 (r, g, b) {
  var red = Math.round(r)
  var green = Math.round(g)
  var blue = Math.round(b)
  return 16 + (red * 36) + (green * 6) + blue
}
