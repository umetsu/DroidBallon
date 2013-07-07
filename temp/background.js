/**
 *  背景
 */
var Background = Class.create(Sprite, {
    initialize: function() {
        Sprite.call(this, BACKGROUND_WIDTH, BACKGROUND_HEIGHT);
        var game = Game.instance;
        this.image = game.assets[BACKGROUND_IMAGE];
        this.vx = BACKGROUND_SCROLL_SPEED;
    },
    update: function() {
        this.x += this.vx;
        if (this.x + BACKGROUND_WIDTH - SCREEN_WIDTH < 0 ) {
            this.moveTo(0, 0);
        }
    }
});
