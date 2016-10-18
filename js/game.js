var Jumpup = Jumpup || {};

Jumpup.Game = function () {


    this.context = null;
    this.scoreText = null;
};

Jumpup.Game.prototype = {

    init: function (context) {

        this.context = context;

        this.game.renderer.renderSession.roundPixels = true;

        this.world.resize(640, 2000);

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.physics.arcade.gravity.y = 750;
        this.physics.arcade.skipQuadTree = false;

    },

    create: function () {
        this.physics.arcade.enable(this.player);

        var style = { fill: "#ffffff", align: "center", fontSize: 32 };

        this.scoreText = this.createText(20, 20, this.context.score || '000', style);
    },

    createText: function(x, y, text, style, size)
    {
        var textObject = this.add.text(x, y, text, style);
        textObject.font = "Roboto Slab";
        textObject.fixedToCamera = true;
        return textObject;
    },



    update: function () {



    },

    end: function(){
        this.state.start('LevelFinished', true, false, this.context);
    }

};