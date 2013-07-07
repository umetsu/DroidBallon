/**
 *  アイテム
 */
var Item = Class.create(Sprite, {
    initialize: function(x, y) {
        Sprite.call(this, ITEM_WIDTH, ITEM_HEIGHT);
        var game = Game.instance;
        this.image = game.assets[ICON_IMAGE];
        this.moveTo(x, y);
        this.vx = ITEM_SPEED;
        this.point = 0;
    },
    update: function() {
        this.x += this.vx;
    }
});

/**
 *  コイン
 */
var Coin = Class.create(Item, {
    initialize: function(x, y) {
        Item.call(this, x, y);
        this.frame = COIN_FRAME;
        this.point = COIN_POINT;
    }
});

/**
 *  ダイヤモンド
 */
var Diamond = Class.create(Item, {
    initialize: function(x, y) {
        Item.call(this, x, y);
        this.frame = DIAMOND_FRAME;
        this.point = DIAMOND_POINT;
    }
});
