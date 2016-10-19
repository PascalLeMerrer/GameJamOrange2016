var Jumpup = Jumpup || {};

Jumpup.Preloader = function(game) {
    this.logo = null;
    this.preloadBar = null;
    this.ready = false;
    this.context = {};
};

Jumpup.Preloader.prototype = {

    init: function() {
        this.fontLoaded = false;
    },

    preload: function() {

        this.preloadBar = this.add.sprite(200, 260, 'preload');
        this.load.setPreloadSprite(this.preloadBar);
        this.load.image('background', 'assets/Full-Background.png');
        this.load.image('key', 'assets/key.png');
        this.load.audio('key', 'assets/key.mp3');
        this.load.image('dialog', 'assets/dialog.png');
        this.load.image('explosion', 'assets/Explosion.png');

        //  Load the Google WebFont Loader script
        this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    },

    create: function() {},

    update: function() {

        //  Make sure all our mp3s have decoded before starting the game

        if (!this.ready) {
            if (this.cache.isSoundDecoded('key') && this.game.fontLoaded) {
                this.ready = true;
                var context = {
                    score: 0,
                    level: 1,
                    lives: 3
                }
                this.state.start('MainMenu', true, false, this.context);
            }
        }

    }

};
