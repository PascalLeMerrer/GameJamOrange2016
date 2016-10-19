var Jumpup = Jumpup || {};

Jumpup.Game = function () {

    this.keys = null;

    this.emitter = null;

    // Ground sprite
    this.ground = null;

    this.context = null;
    this.scoreText = null;

    this.average = 0;

    this.gravity = 5;

    this.gameTimer =  null;

    this.gameDuration = 60; // in seconds
};

var gameConfig = {
    width: 800,
    height: 600,
    keysize: 50,
    spawnY: 10
}

Jumpup.Game.prototype = {

    init: function(context) {

        this.context = context;

        this.playgroundHeight = 518;

        this.game.renderer.renderSession.roundPixels = true;

        this.world.resize(gameConfig.width, gameConfig.height);

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.physics.arcade.skipQuadTree = false;
    },

    create: function() {
        // this.physics.arcade.enable(this.player);

        this.background = this.add.tileSprite(0, 0, gameConfig.width, gameConfig.height, 'background');

        var style = { fill: "#ffffff", align: "center", fontSize: 32 };

        this.scoreText = this.createText(20, 20, this.context.score || '000', style);

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.keys = this.add.group();
        this.keys.enableBody = true;
        this.keys.physicsBodyType = Phaser.Physics.ARCADE;

        var game = this

        function arm() {
            game.time.events.add(getDelay(), function() {
                addKeySprite(game);
                arm()
            }, game);
        }
        arm()

        // Ground
        this.ground = this.add.sprite(0, this.playgroundHeight, "");
        this.ground.width = gameConfig.width;
        this.physics.enable(this.ground, Phaser.Physics.ARCADE);
        this.ground.body.immovable = true

        this.initKeyboard();

        // Particle effect
        this.emitter = game.add.emitter(0, 0, 100);
        this.emitter.makeParticles('explosion');

        this.gameTimer = this.time.create(false);

        this.gameTimer.add(1000 * this.gameDuration, this.endGame, this);
        this.gameTimer.start();
    },

    initKeyboard: function() {
        game.input.keyboard.addCallbacks(this, this.onDown);
    },

    onDown: function(keyboardEvent) {
        console.log(keyboardEvent);
        var char = keyboardEvent.key;
        this.sound.play('key');
        keyCount = this.keys.children.length;
        for (var i = 0; i < keyCount; i++) {
            var keySprite = this.keys.children[i];
            if (keySprite.key.alive &&
                (keySprite.key.keyLetter.toLowerCase() === char)) {
                var level = 5 - Math.round((keySprite.y / this.playgroundHeight) * 5)
                points = level * 10;
                this.context.score += points;
                this.scoreText.setText(this.context.score);
                this.displaySuccessMessage(keySprite.x, keySprite.y, level)
                keySprite.kill();
                this.keys.remove(keySprite);
                keySprite = null;
                this.average *= 0.7;
                this.average += level * 0.3;
                this.gravity = 4 + 10 * this.average;
            }
        }
    },

    createText: function(x, y, text, style, size) {
        var textObject = this.add.text(x, y, text, style);
        textObject.font = "Roboto Slab";
        textObject.fixedToCamera = true;
        return textObject;
    },



    update: function() {

        // Collision between keys
        game.physics.arcade.collide(this.keys, this.keys, function(key1, key2) {
            key1.key.grounded();
            key2.key.grounded();
            return true;
        }, null, this);

        // Collision between key and ground
        game.physics.arcade.collide(this.keys, this.ground, function(ground, key) {
            key.key.grounded();
            return true;
        }, null, this);

        var emitter = this.emitter;
        emitter.forEachAlive(function(p){
            if(emitter.lifespan && emitter.alive){
                p.alpha = p.lifespan / emitter.lifespan;
            }
        });
    },

    endGame: function() {
        this.state.start('LevelFinished', true, false, this.context);
    },


    displaySuccessMessage: function(x, y, level){
        var messageTxt = "Ok";
        switch(level){
            case 1:
                messageTxt = "Ok";
                break;
            case 2:
                messageTxt = "Bien joué";
                break;
            case 3:
                messageTxt = "Super";
                break;
            case 4:
                messageTxt = "Excellent";
                break;
            case 5:
                messageTxt = "Génialissime";
                break;
        }

        var popup = this.add.sprite(x, y, "dialog");
        if (popup.x + popup.width > gameConfig.width) {
            popup.x = gameConfig.width - popup.width;
        }

        var style = {
            font: "25px Arial", fill: "#ffffff",
            wordWrap: true, wordWrapWidth: popup.width,
            align: "center",
        };

        var text = this.make.text(popup.width / 2, popup.height / 2, messageTxt, style);
        text.anchor.set(0.5);

        var message = popup.addChild(text);

        var fadeTween = this.game.add.tween(popup).to( { alpha: 0 }, 1500, null, true);
        this.emitter.x = x;
        this.emitter.y = y;
        this.emitter.start(true, 1000, null, 25);

        var fadeTween = this.game.add.tween(message).to( { alpha: 0 }, 1500, null, true);
        fadeTween.onCompleteCallback = function(){
            popup.kill();
        }
    }
};

function getDelay() {
    return 1500;
}


function freeSpaceCheck(game, x) {
  var bounder1 = new Phaser.Rectangle(x, gameConfig.spawnY, gameConfig.keysize, gameConfig.keysize);
  for (var i = 0; i < game.keys.children.length;  i++ ) {
    var key = game.keys.children[i];
    if (key.alive) {
      var bounder2 = new Phaser.Rectangle(key.x, key.y, gameConfig.keysize, gameConfig.keysize)
      if (Phaser.Rectangle.intersects(bounder1, bounder2) ) return false;
    }
  }
  return true;
}

function addKeySprite(game) {
   var rand = function(upto) { return game.rnd.integerInRange(0, upto-1); }
   var randx = rand(gameConfig.width-gameConfig.keysize);

   var secu=100
   while(! freeSpaceCheck(game,randx) && secu > 0) {
     randx = rand(gameConfig.width-gameConfig.keysize);
     secu--;
   }
   if (secu > 0)  {
     var keys="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
     var randCharIndex = rand(keys.length);
     var randChar = keys[randCharIndex]
     var key = new Key(game, randx, gameConfig.spawnY, randChar);
     game.keys.add(key.sprite);
   } else {
     this.state.start('LevelFinished', true, false, this.context);
   }
}

function Key(game, x, y, keyLetter) {
    this.game = game;
    this.keyLetter = keyLetter;
    // Background sprite
    this.sprite = game.add.sprite(x, y, 'key');
    this.sprite.width = 50;
    this.sprite.height = 50;

    this.sprite.key = this;

    this.alive = true;

    // Letter
    var style = {
        font: "32px Arial",
        fill: "#3B8C22",
        wordWrap: true,
        wordWrapWidth: this.sprite.width,
        align: "center"
    };
    this.letterText = this.sprite.addChild(game.make.text(this.sprite.width/2, this.sprite.height/2, keyLetter, style));
    this.letterText.anchor.set(0.5);

    // Background physics body
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.gravity.y = game.gravity;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.setSize(44, 44, 3, 3)
}

// invoked when the key hits the ground
Key.prototype.grounded = function() {
    if (this.alive) {
        this.alive = false;
        this.game.add.tween(this.letterText).to( { alpha: 0 }, 1000, null, true);
        this.sprite.body.immovable = true;
    } else if(this.sprite.body.moves){
        this.sprite.body.moves = false;
    }
}
