var Jumpup = Jumpup || {};

Jumpup.Preloader = function (game) {
    this.logo = null;
    this.preloadBar = null;
    this.ready = false;
};

Jumpup.Preloader.prototype = {

    init: function () {

        this.add.sprite(265, 400, 'logo');
        this.fontLoaded = false;

    },

    preload: function () {

        this.preloadBar = this.add.sprite(120, 260, 'preload');
        this.load.setPreloadSprite(this.preloadBar);
        //this.load.image('trees', 'assets/trees.png');
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

            this.state.start('MainMenu', true, false, context);

            // if (this.cache.isSoundDecoded('coin') &&
            //     this.cache.isSoundDecoded('jumping') &&
            //     this.game.fontLoaded)
            // {
            //     this.ready = true;

            //     var context = {
            //         score: 0,
            //         level: 1,
            //         lives: 3
            //     }
            //     this.state.start('MainMenu', true, false, context);
            // }
        }

    }

};