var createCharm = require('charm')

module.exports = Clanvas

function Clanvas (stdout, width, height, bg) {
  this.ratio = 2
  this.charm = createCharm()
  this.charm.pipe(stdout)
  this.charm.reset()
  this.charm.cursor(false)
  this.width = Math.floor(width / this.ratio)
  this.height = height - 2
  this.backgroundColor = bg
}

Clanvas.prototype.fill = function (color) {
  for (var i = 0; i <= this.height; i++) {
    this.fillLine(i, color)
  }
}

Clanvas.prototype.clear = function () {
  this.fill(this.backgroundColor)
}

Clanvas.prototype.paintCell = function (x, y, fg, bg, char) {
  this.charm
    .background(bg)
    .foreground(fg)
    .position(x * this.ratio, y + 2)
    .write(char + ' ')
}

Clanvas.prototype.fillLine = function (y, color) {
  var line = new Array(1 + this.width).join('  ')
  this.charm
    .background(color)
    .position(1, y + 2)
    .write(line)
}

Clanvas.prototype.dispose = function () {
  this.charm.reset()
}
