class Play extends Phaser.Scene{
    constructor() {
        super("playScene");
    }

    preload(){
        this.load.path = './assets/';
        this.load.image('rocket', "rocket.png");;
        this.load.image('spaceship', 'spaceship.png');
        this.load.image('starfield', 'starfield.png');
    }

    create(){
        // Scrolling background
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        // Green Rectangle at the top
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00ff00).setOrigin(0,0);

        // White borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        // Wiring up keys for movement
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // Rocket
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        // SPACESHIP!
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
        }

    update() {
        this.starfield.tilePositionX -= 2;
        this.p1Rocket.update();
        this.ship01.update();
        this.ship02.update();
        this.ship03.update();

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset()
            this.ship03.reset()
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset()
            this.ship02.reset()
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset()
            this.ship01.reset()
        }
      }

      checkCollision(rocket, ship){
        // Man i hate this line of code. I mistyped it so many times
        if (rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height &&rocket.height + rocket.y > ship. y) {
            return true;
          } else {
            return false;
          }
      }
}