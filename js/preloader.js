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
        this.load.spritesheet('coin', 'assets/spinning_coin_gold.png', 32, 32);
        this.load.spritesheet('redCoin', 'assets/spinning_coin_red.png', 32, 32);
        this.load.spritesheet('blueCoin', 'assets/spinning_coin_blue.png', 32, 32);
        this.load.spritesheet('greenCoin', 'assets/spinning_coin_green.png', 32, 32);
        this.load.image('trees', 'assets/trees.png');
        this.load.image('heart', 'assets/heart.png'); // source https://www.iconfinder.com/icons/3547/favourite_heart_love_icon#size=32
        this.load.image('clouds', 'assets/clouds.png');
        this.load.image('basic', 'assets/platform.png');
        this.load.image('ice', 'assets/ice-platform.png');
        this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        this.load.audio('coin', 'assets/coin2.mp3');
        this.load.audio('death', 'assets/death.mp3');
        this.load.audio('jumping', 'assets/Jump-SoundBible.com-1007297584.mp3');
        this.load.audio('levelup', 'assets/243020__plasterbrain__game-start.ogg');

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
            if (this.cache.isSoundDecoded('coin') &&
                this.cache.isSoundDecoded('jumping') &&
                this.game.fontLoaded)
            {
                this.ready = true;

                var context = {
                    score: 0,
                    level: 1,
                    lives: 3
                }
                this.state.start('MainMenu', true, false, context);
            }
        }

    }

};