// Enemies our player must avoid
const Enemy = function(x,y,speed) {
    this.x = x;
    this.y = y + 55;
    this.step = 101;
    this.speed = speed;
    this.resetPos = -this.step;
    this.boundary = this.step * 5;
    this.sprite = 'images/landshark.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiplying any movement by the dt parameter
    // ensures the game runs at the same speed for
    // all computers.
    if (this.x < this.boundary) {
      this.x += this.speed * dt;
    } else {
      this.x = this.resetPos;
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Object  for keeping track of, displaying, and resetting game
// scores.
const scores = {
   booty: 0,
   bites: 0,
   score: 0,
   updateScore () {
     this.score = (this.booty * 20) -
       (this.bites * 20);
     document.querySelector('.score').innerHTML =  this.score;
   },
   bitten () {
     this.bites += 1;
     this.updateScore();
     scream.play();
     document.querySelector('.bites').innerHTML = this.bites;
     document.querySelector('.modal_message').innerHTML =
       `<h2>AIEEE!</h2>`;
     document.querySelector('.modal').style.display = "block";
     document.querySelector('.modal_button').style.display = "none";
     setTimeout(function () {
       document.querySelector('.modal').style.display = "none";
       document.querySelector('.modal_button').style.display = "block";
        }, 500
      );
   },
   plundered () {
     this.booty += 1;
     this.updateScore();
     arrr.play();
     document.querySelector('.booty').innerHTML = this.booty;
   },
   reset () {
     this.booty = 0;
     this.bites = 0;
     this.score = 0;
     document.querySelector('.booty').innerHTML = "0";
     document.querySelector('.bites').innerHTML = "0";
     document.querySelector('.score').innerHTML = "0";
   }
}
// Treasures are handled in the same way as enemies, with an array,
// but the treasures do not move, so they only need position
// and image.
var Treasure = function() {
    this.sprite = 'images/treasure.png';
    this.x = 0;
    this.y = 0;
}
// Method to render treasures
Treasure.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Function to set (initially) or reset treasure positions for
// new game.
function treasuresReset() {
  treasure1.x = 101;
  treasure1.y = 55;
  treasure2.x = 303;
  treasure2.y = 55;
  treasure3.x = 404;
  treasure3.y = 138;
  treasure4.x = 0;
  treasure4.y = 221;
  treasure5.x = 303;
  treasure5.y = 221;
}

// Player class.
class Hero {
  constructor() {
    this.sprite = 'images/pirate.png';
    this.step = 101;
    this.jump = 83;
    this.startX = this.step * 2;
    this.startY = (this.jump * 4) + 55;
    this.x = this.startX;
    this.y = this.startY;
    this.victory = false;
    this.start = true;
  }
  // Render both player and pirate ship, which has a fixed position.
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.drawImage(Resources.get('images/pirate-ship.png'), 404, -40);
  }
  // update x or y, and then reverse if move falls outside
  // game field. This seems more concise than a long case
  // statement. If the game is starting first time, start playing the
  // background music.  This can only be done after the user
  // has interacted with the page, which is why it is placed here.
  handleInput(input = 'up') {
    this[offsets[input][1]] += offsets[input][0];
    if (this.x < 0 || this.x >= 505 ||
        this.y < -29 || this.y >= 400 ) {
      this[offsets[input][1]] -= offsets[input][0];
    };
    if (this.start) {
      this.start = false;
      capitalShip.play();
    };
  }
  // Check for collisions. If there is a collision, call
  // scores.bitten and reset player position.
  update() {
    for (let enemy of allEnemies) {
      if (this.y === enemy.y && (enemy.x + enemy.step/2 > this.x
      && enemy.x < this.x + this.step/2) ) {
        scores.bitten();
        this.reset();
      };
    };
   // If a treasure was picked up,
   // move it off screen (on next render) and call scores.plundered.
    for (let treasure of allTreasures) {
        if (this.y === treasure.y && this.x === treasure.x) {
          treasure.x = -200;
          scores.plundered();
        }
    };
    // If the player reaches the pirate ship, play arr and set
    // this.victory to true, which will end the game.
    if (this.y === -28 && this.x === 404) {  // 55
        arrr.play();
        this.victory = true;
    };
  }
  // reset player position to starting position.
  reset() {
    this.y = this.startY;
    this.x = this.startX;
  }
}

// Offsets and axes for moves.  These are used in the handleInput
// method above.
var offsets = {
   left: [-101, 'x'],
   up: [-83,'y'],
   right: [101, 'x'],
   down: [83, 'y']
}

// instantiate player and shark objects, and stick
// the shark objects in the allEnemies array.
const player = new Hero();
const shark1 = new Enemy(-101,0,200);
const shark2 = new Enemy(-101,83,300);
const shark3 = new Enemy(-260,83,500);
const shark4 = new Enemy(-400,166,250);
const shark5 = new Enemy(-101,0,400);
const allEnemies = [];
allEnemies.push(shark1,shark2,shark3,shark4,shark5);

// Instantiate treasure objects and treasure array
const treasure1 = new Treasure();
const treasure2 = new Treasure();
const treasure3 = new Treasure();
const treasure4 = new Treasure();
const treasure5 = new Treasure();
//initialize positions for treasures
treasuresReset();
//declare and fill allTreasures array.
const allTreasures = [];
allTreasures.push(treasure1,treasure2,treasure3,treasure4,treasure5);

// audio objects.
var scream = new Audio('audio/AAAGH1.wav');
var arrr = new Audio('audio/PIRATE-Arrrrrrrr_03.mp3');
var capitalShip = new Audio('audio/capital.mp3');
capitalShip.loop = true;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

// This prevents the arrow keys from causing irritating
// page scrolling.
document.addEventListener('keydown', function(e) {
   if([37,38,39,40].includes(e.keyCode)) {
       e.preventDefault();
   }
});
