var Jumpup = Jumpup || {};

Jumpup.Preloader = function (game) {
    this.logo = null;
    this.preloadBar = null;
    this.ready = false;
    this.context = {};
};

Jumpup.Preloader.prototype = {

    init: function () {
        // this.add.sprite(265, 400, 'logo');
        this.fontLoaded = false;
    },

    preload: function () {

        this.preloadBar = this.add.sprite(200, 260, 'preload');
        this.load.setPreloadSprite(this.preloadBar);
        this.load.image('background', 'assets/Full-Background.png');
        //this.load.audio('levelup', 'assets/243020__plasterbrain__game-start.ogg');

        //  Note: Graphics are Copyright 2015 Photon Storm Ltd.
            //  Load the Google WebFont Loader script
        this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    },

    create: function () {
    },

    update: function () {


        //  Make sure all our mp3s have decoded before starting the game

        if (!this.ready)
        {
            if (this.game.fontLoaded)
            {
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