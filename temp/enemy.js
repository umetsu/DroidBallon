/**
 *  敵
 */
var Enemy = Class.create(Sprite, {
    initialize: function(x, y) {
        Sprite.call(this, ENEMY_WIDTH, ENEMY_HEIGHT);
        var game = Game.instance;
        this.image = game.assets[ENEMY_IMAGE];
        this.time = 0;
        this.moveTo(x, y);
        this.vx = ENEMY_SPEED;
        this.vy = Math.sin(this.time * 5 * Math.PI / 180);
    },
    update: function() {
        this.vy = Math.sin(this.time * 5 * Math.PI / 180);
        this.x += this.vx;
        this.y += this.vy;

        if (this.time % 5 === 0 ) {
            ++this.frame;
            this.frame %= 3;
        }

        ++this.time;
    }
});
