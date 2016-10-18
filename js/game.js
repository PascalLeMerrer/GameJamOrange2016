var Jumpup = Jumpup || {};

Jumpup.Game = function () {

    this.keys = null;

    // Ground sprite
    this.ground = null;

    this.context = null;
    this.scoreText = null;
};

Jumpup.Game.prototype = {
    // Assets loading - do not use asssets here
    preload: function () {
        this.load.image("key", "assets/key.png")
    },

    init: function (context) {

        this.context = context;

        this.game.renderer.renderSession.roundPixels = true;

        this.world.resize(800, 600);

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.physics.arcade.gravity.y = 750;
        this.physics.arcade.skipQuadTree = false;



    },

    create: function () {
        // this.physics.arcade.enable(this.player);

        this.background = this.add.tileSprite(0, 0, 800, 600, 'background');
        var style = { fill: "#ffffff", align: "center", fontSize: 32 };

        this.scoreText = this.createText(20, 20, this.context.score || '000', style);

        this.physics.startSystem(Phaser.Physics.ARCADE);


        this.keys = this.add.group();
        this.keys.enableBody = true;
        this.keys.physicsBodyType = Phaser.Physics.ARCADE;

       // Sample key
        var k = new Key(this, 110, 10, "k");
        var b = new Key(this, 140, 70, "b");

        this.keys.add(k.sprite);
        this.keys.add(b.sprite);

        // Ground
        this.ground = this.add.sprite(0, 518, "");
        this.ground.width = 800;
        this.physics.enable(this.ground, Phaser.Physics.ARCADE);
        this.ground.body.immovable = true
    },

    createText: function(x, y, text, style, size)
    {
        var textObject = this.add.text(x, y, text, style);
        textObject.font = "Roboto Slab";
        textObject.fixedToCamera = true;
        return textObject;
    },



    update: function () {

        game.physics.arcade.collide(this.keys, this.keys, function(key1, key2){
            //key1.key.grounded();
            //key2.key.grounded();
           return true;
        }, null, this);

        game.physics.arcade.collide(this.keys, this.ground, function(ground, key){
            key.key.grounded();
            return true;
        }, null, this);


    },

    end: function(){
        this.state.start('LevelFinished', true, false, this.context);
    }

};


function Key(game, x, y, keyLetter){

    this.keyLetter = keyLetter;

    // Background sprite
    this.sprite = game.add.sprite(x, y, 'key');
    this.sprite.width = 50;
    this.sprite.height = 50;

    this.sprite.key = this;
    
    // Letter
    var style = { 
        font: "32px Arial", fill: "#ff6600", 
        wordWrap: true, wordWrapWidth: this.sprite.width, 
        align: "center"
    };
    var letterText = this.sprite.addChild(game.make.text(30, 25, keyLetter, style));
    letterText.anchor.set(0.5);
    
    // Background physics body
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.gravity.y = 100;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.setSize(44, 44, 3, 3)
} 

Key.prototype.grounded = function(){
    // console.log("Letter "+this.keyLetter+" has hit the bottom");
}
