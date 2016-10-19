var Jumpup = Jumpup || {};

Jumpup.LevelFinished = function () {
    this.endText = null;
    this.instructions = null;
    this.context = null;
    this.sky = null;
};

Jumpup.LevelFinished.prototype = {

    init: function(context) {
        this.context = context;
    },

    preload: function () {
    },

    create: function () {

        this.sky = this.add.tileSprite(0, 0, 800, 600, 'background');

        this.endText = this.createText(this.camera.view.width / 2,
                                       this.camera.view.height / 2,
                                       60);

        this.instructions = this.createText(this.camera.view.width / 2,
                                            this.camera.view.height * 0.75,
                                            45);

        this.endText.setText("Score Final : " + this.context.score);
        this.instructions.setText("Appuyez sur entrée\npour recommencer");
    },

    createText: function (x, y, fontSize) {
        var style = { fill: "#3B8C22", align: "center" };
        var text = this.add.text(x, y, '', style);
        text.font = "Roboto Slab";
        text.fontSize = fontSize;
        text.anchor.x = 0.5;
        text.anchor.y = 0.5;
        text.align = 'center';
        text.fixedToCamera = true;
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
