var Jumpup = Jumpup || {};

Jumpup.Game = function () {

    this.keys = null;

    // Ground sprite
    this.ground = null;

    this.context = null;
    this.scoreText = null;
};

var gameConfig = {
  width: 800,
  height: 600,
  keysize: 50
}

Jumpup.Game.prototype = {
    // Assets loading - do not use asssets here
    preload: function () {
        this.load.image("key", "assets/key.png")
    },

    init: function (context) {

        this.context = context;

        this.game.renderer.renderSession.roundPixels = true;

        this.world.resize(gameConfig.width, gameConfig.height);


        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.physics.arcade.gravity.y = 750;
        this.physics.arcade.skipQuadTree = false;
    },

    create: function () {
        // this.physics.arcade.enable(this.player);

        this.background = this.add.tileSprite(0, 0, gameConfig.width, gameConfig.height, 'background');
        var style = { fill: "#ffffff", align: "center", fontSize: 32 };

        this.scoreText = this.createText(20, 20, this.context.score || '000', style);

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.keys = this.add.group();
        this.keys.enableBody = true;
        this.keys.physicsBodyType = Phaser.Physics.ARCADE;

       addKeySprite(this);
       addKeySprite(this);
       addKeySprite(this);

        // Ground
        this.ground = this.add.sprite(0, 518, "");
        this.ground.width = gameConfig.width;
        this.physics.enable(this.ground, Phaser.Physics.ARCADE);
        this.ground.body.immovable = true

        this.initKeyboard();
    },

    initKeyboard: function() {
        game.input.keyboard.addCallbacks(this, null, null, this.onPress);
    },

    onPress: function(char) {
        this.sound.play('key');
        this.keys.forEachAlive(function(key) {
            if(key.key.keyLetter.toLowerCase() === char.toLowerCase()) {
                key.kill();
            }
        }, this)
    },

    createText: function(x, y, text, style, size)
    {
        var textObject = this.add.text(x, y, text, style);
        textObject.font = "Roboto Slab";
        textObject.fixedToCamera = true;
        return textObject;
    },



    update: function () {

        // Collision between keys
        game.physics.arcade.collide(this.keys, this.keys, function(key1, key2){
            key1.key.grounded();
            key2.key.grounded();
           return true;
        }, null, this);

        // Collision between key and ground
        game.physics.arcade.collide(this.keys, this.ground, function(ground, key){
            key.key.grounded();
            return true;
        }, null, this);



    },

    end: function(){
        this.state.start('LevelFinished', true, false, this.context);
    }

};

function addKeySprite(game) {
   var rand = function(upto) { return game.rnd.integerInRange(0, upto-1); }
   var randx = rand(gameConfig.width-gameConfig.keysize);
   var keys="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
   var randc = rand(keys.length);
   var key = new Key(game, randx, 10, keys[randc]);
   game.keys.add(key.sprite);
}

function Key(game, x, y, keyLetter){
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
        font: "32px Arial", fill: "#ff6600",
        wordWrap: true, wordWrapWidth: this.sprite.width,
        align: "center"
    };
    this.letterText = this.sprite.addChild(game.make.text(30, 25, keyLetter, style));
    this.letterText.anchor.set(0.5);

    // Background physics body
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.gravity.y = 100;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.setSize(44, 44, 3, 3)
}

Key.prototype.grounded = function(){
    if(this.alive){
        this.alive = false;
        console.log("Letter "+this.keyLetter+" has hit the bottom");
        this.game.add.tween(this.letterText).to( { alpha: 0 }, 1000, null, true);
    }
}
