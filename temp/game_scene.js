/**
 *  ゲームシーン
 */
var GameScene = Class.create(Scene, {
    initialize: function() {
        Scene.call(this);
        this.backgroundColor = '#0af';
        this.update = this.updateRunning;
        this.isTouch = false;

        this.world = new World( this );
    },
    ontouchstart: function() {
        this.isTouch = true;
    },
    ontouchend: function() {
        this.isTouch = false;
    },
    onenterframe: function() {
        this.update();
    },
    updateRunning: function() {
        var game = Game.instance;
        //  BGM再生
        // game.assets[MAIN_BGM].play();

        this.world.update();
        if (this.world.isGameOver) {
            // game.assets[MAIN_BGM].stop();
            this.gameOver();
        }
    },
    updateGameOver: function() {
        var game = Game.instance;
        if ( game.getElapsedTime() - this.time < 0.5 ) return;
        if (this.isTouch) {
            game.replaceScene( new TitleScene() );
        }
    },
    gameOver: function() {
        var game = Game.instance;
        var image = game.assets[END_IMAGE];
        var end = new Sprite(image.width, image.height);
        end.image = image;
        end.x = (game.width - end.width) / 2;
        end.y = (game.height - end.height) / 2;
        this.addChild( end );
        this.time = game.getElapsedTime();
        this.update = this.updateGameOver;
    }
});
