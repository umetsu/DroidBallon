/**
 *  プレイヤーが操作する気球
 */
var Ballon = Class.create(Sprite, {
    initialize: function(x, y) {
        Sprite.call(this, BALLON_WIDTH, BALLON_HEIGHT);
        var game = Game.instance;
        this.image = game.assets[PLAYER_IMAGE];
        this.moveTo(x, y);
        this.vy = 0;
        this.frame = 0;
    },
    update: function(rize) {
        this.vy += rize + GRAVIRY;
        this.y  += this.vy;

        if (rize < 0) this.frame = 1;
        else this.frame = 0;
    }
});
