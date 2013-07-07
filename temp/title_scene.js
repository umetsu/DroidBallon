/**
 *  タイトルシーン
 */
var TitleScene = Class.create(Scene, {
    initialize: function() {
        Scene.call( this );
        this.backgroundColor = '#0af';
        var game = Game.instance;
        var image = game.assets[START_IMAGE];
        var start = new Sprite(image.width, image.height);
        start.image = image;
        start.x = (game.width - start.width) / 2;
        start.y = (game.height - start.height) / 2;
        this.addChild( start );

        this.ballonRising = false;
        this.ballon = new Ballon(
                ( SCREEN_WIDTH - BALLON_WIDTH) / 2,
                ( SCREEN_HEIGHT - BALLON_HEIGHT) / 2 + 50 );
        this.scene.addChild(this.ballon);
    },
    ontouchstart: function() {
        var game = Game.instance;
        game.replaceScene( new GameScene() );
    },
    onenterframe: function() {
        var game = Game.instance;
        var ballon = this.ballon;
        if (ballon.vy > 3 && !this.ballonRising) {
            this.ballonRising = true;
        }
        if (ballon.vy < -3 && this.ballonRising) {
            this.ballonRising = false;
        }
        var rise = this.ballonRising ? BALLON_RISE : 0;
        ballon.update(rise);
    }
});
