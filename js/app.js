//Global variables for player starting position
const startingX = 200; 
const startingY = 380;

// This parent class describes mutual behaviour of game participants (enemies and player)
class Entity {
    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/' + sprite + '.png';
        this.height = 171;
        this.width = 101;
    }
    // Draw the game participant on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y); 
    }
}
 
// Enemy class
class Enemy extends Entity {
    constructor(x, y, sprite) {
        super(x, y, sprite);
        this.speed = Math.round(Math.random() * 500 + 50); //sets random speed for new enemy object
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        //checks the enemy position and resets if it is of screen
        if (this.x > 500) {
            this.x = -(this.speed);
        }
        else {
            this.x += this.speed * dt;
        }
    }
}

// Player class
class Player extends Entity {
    constructor(x, y, sprite) {
        super(x, y, sprite);
        this.gameWinner = false;
    }

    // update player coordinates
    update() {
        // values used to move player arround
        const moveHorizontal = 100; 
        const moveVertical = 80;

        if (this.arrowPressed) {
            switch (this.direction) {
                case "down":
                    this.y += moveVertical;
                    this.arrowPressed = false;
                    break;
                case "up":
                    this.y -= moveVertical;
                    this.arrowPressed = false;
                    break;
                case "left":
                    this.x -= moveHorizontal;
                    this.arrowPressed = false;
                    break;
                case "right":
                    this.x += moveHorizontal;
                    this.arrowPressed = false;
                    break;
            }
            this.playerBounds();
        }
    }

    handleInput(direction) {
        this.direction = direction;
        this.arrowPressed = true;
    }

    //Check that Player can not move off screen
    playerBounds() {
        const rightBorder = 400;
        const bottomBorder = 380;

        if (this.x < 0) {
            this.x = 0;
        }
        //this is winning condition, when the player reaches the water
        if (this.y < 0) {
            this.y = startingY;
            this.x = startingX;
            this.gameWinner = true;
        }
        if (this.x > rightBorder) {
            this.x = rightBorder;
        }
        if (this.y > bottomBorder) {
            this.y = bottomBorder;
        }
    }
}

// all enemy objects in an array called allEnemies
let firstEnemy = new Enemy(-100, 60, 'enemy-bug');
let secondEnemy = new Enemy(-100, 140, 'enemy-bug');
let thirdEnemy = new Enemy(-100, 220, 'enemy-bug');
let allEnemies = [];
allEnemies.push(firstEnemy);
allEnemies.push(secondEnemy);
allEnemies.push(thirdEnemy);

// the player object in a variable called player
let player = new Player(startingX, startingY, 'char-boy');

//when collision happends, reset player coordinates and enemy speeds
function checkCollisions() {
    const borderHorizontal = 50;
    const borderVertical = 20;

    allEnemies.forEach(function(enemy) {
        if (player.x >= enemy.x - borderHorizontal && player.x <= enemy.x + borderHorizontal && player.y >= enemy.y - borderVertical && player.y <= enemy.y + borderVertical) {
            player.y = startingY;
            player.x = startingX;
            resetEnemySpeed();
        }
    });
}

// This listens for key presses and sends the keys to Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

// This is used when the collision happened or when the game was won.
function resetEnemySpeed() {
    allEnemies.forEach(function(enemy) {
        enemy.speed = Math.round(Math.random() * 500 + 50);
        enemy.x = -(enemy.speed);
    });
}


