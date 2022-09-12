function boooo() {
  var but = document.getElementById("btn__img");
  but.style.backgroundImage = "url(https://64.media.tumblr.com/tumblr_maiubutRWP1rfjowdo1_r1_500.gif)";
}
function mario() {
  var but = document.getElementById("btn__img");
  but.style.backgroundImage = "url(https://c.tenor.com/3uHxa8bk_lkAAAAi/mario-super-mario.gif)";
}

function booming() {
  var boom = document.getElementsByTagName("link")[0];
  var bext = document.getElementById("btn__boom");
  if (boom.getAttribute("href") == "style.css") {
    boom.setAttribute("href", "boom.css");
    bext.textContent = "Turn back Time";
  }
  else {
    boom.setAttribute("href", "style.css");
    bext.textContent = "Stop it!";
  }
}

var myGamePiece;

function startGame() {
  myGameArea.start();
  myGamePiece = new component(150, 150, "https://thumbs.gfycat.com/ValuableDesertedBlackpanther-max-1mb.gif", 500, 730, "image");
}

var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 1700;
    this.canvas.height = 10700;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);
    window.addEventListener('keydown', function (e) {
      myGameArea.key = e.keyCode;
    })
    window.addEventListener('keyup', function (e) {
      myGameArea.key = false;
    })
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

function component(width, height, color, x, y, type) {
  this.type = type;
  if (type == "image") {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function () {
    ctx = myGameArea.context;
    if (type == "image") {
      ctx.drawImage(this.image,
        this.x,
        this.y,
        this.width, this.height);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  this.newPos = function () {
    this.x += this.speedX;
    this.y += this.speedY;
  }
}

function updateGameArea() {
  myGameArea.clear();
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0;
  if (myGameArea.key && myGameArea.key == 65) { myGamePiece.speedX = -5; }
  if (myGameArea.key && myGameArea.key == 68) { myGamePiece.speedX = 5; }
  if (myGameArea.key && myGameArea.key == 87) { myGamePiece.speedY = -5; }
  if (myGameArea.key && myGameArea.key == 83) { myGamePiece.speedY = 5; }
  myGamePiece.newPos();
  myGamePiece.update();
}