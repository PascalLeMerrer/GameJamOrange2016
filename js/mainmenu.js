var Jumpup = Jumpup || {};

Jumpup.MainMenu = function () {
    this.endText = null;
    this.instructions = null;
    this.context = null;
    this.sky = null;
};

Jumpup.MainMenu.prototype = {

    init: function(context) {
        this.context = context;
    },

    preload: function () {
    },

    create: function () {
        this.stage.backgroundColor = '#2f9acc';

        this.background = this.add.tileSprite(0, 0, 800, 600, 'background');

        this.instructions = this.createText(this.camera.view.width / 2,
                                            200,
                                            25);

        this.instructions.setText("Vous dever détruire les lettres qui tombent\n" +
                                  "avant qu'elles ne touchent le sol.\n" +
                                  "Pressez la touche correspondante\n" +
                                  "du clavier pour détruire une lettre.");

        this.startText = this.createText(this.camera.view.width / 2,
                                       450,
                                       40   );
        this.startText.setText('Appuyer sur entrée\npour commencer');


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
