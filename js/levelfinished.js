var Jumpup = Jumpup || {};

Jumpup.LevelFinished = function () {
    this.scoreText = null;
    this.highScoreText = null;
    this.instructions = null;
    this.context = null;
    this.sky = null;
};

Jumpup.LevelFinished.prototype = {

    init: function(context) {
        this.context = context;
        if(this.context.highScore === undefined
           || this.context.highScore < this.context.score) {
            this.context.highScore = this.context.score;
        }
    },

    preload: function () {
    },

    create: function () {

        this.sky = this.add.tileSprite(0, 0, 800, 600, 'background');

        var xCenter = this.camera.view.width / 2;
        var yCenter = this.camera.view.height / 2;

        this.scoreText = this.createText(xCenter,
                                       yCenter * 0.75,
                                       60,
                                       "Votre score  : " + this.context.score);

        this.scoreText = this.createText(xCenter,
                                         yCenter,
                                         60,
                                         "Meilleur score  : " + this.context.highScore);

        this.instructions = this.createText(xCenter,
                                            yCenter * 1.5,
                                            45,
                                            "Appuyez sur entrée\npour recommencer");
    },

    createText: function (x, y, fontSize, content) {
        var style = { fill: "#3B8C22", align: "center" };
        var text = this.add.text(x, y, '', style);
        text.font = "Roboto Slab";
        text.fontSize = fontSize;
        text.anchor.x = 0.5;
        text.anchor.y = 0.5;
        text.align = 'center';
        text.fixedToCamera = true;
        text.setText(content);
        return text;
    },

    update: function () {
        if (this.input.keyboard.isDown(Phaser.Keyboard.ENTER))
        {
            this.context.score = 0;
            this.context.level = 1;
            this.context.isGameOver = false;
            this.state.start('Game', true, false, this.context);
        }
    }
};
