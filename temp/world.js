/**
 *  ゲーム空間を管理するクラス
 */
var World = (function(scene) {

    function World(scene) {
        this.scene = scene;
        this.background = new Background();
        this.scene.addChild(this.background);
        this.player = new Ballon( 10, ( SCREEN_HEIGHT - BALLON_HEIGHT) / 2 );
        this.scene.addChild(this.player);
        this.enemies = [];
        this.items = [];
        this.score = 0;
        this.scoreLabel = new ScoreLabel(10, 10);
        this.scoreLabel.score = this.score;
        this.scene.addChild(this.scoreLabel);
    }

    World.prototype.update = function() {
        this.background.update();
        //  プレイヤー
        this.updatePlayer();
        //  敵
        this.updateEnemies();
        //  アイテム
        this.updateItems();

        this.scoreLabel.score = this.score;
    };

    /**
     *  気球更新
     */
    World.prototype.updatePlayer = function() {
        var rize = 0;       //  浮かび上がる力
        if (this.scene.isTouch) {
            rize = BALLON_RISE;
        }
        this.player.update(rize);
        if (this.player.y + this.player.height < 0 ||
            this.player.y > SCREEN_HEIGHT) {
            this.isGameOver = true;
        }
    };

    /**
     *  カラスの更新
     */
    World.prototype.updateEnemies = function() {
        var game = Game.instance;
        var i = 0;
        var enemy = null;

        if (game.frame % 25 === 0) {
            enemy = new Enemy(
                SCREEN_WIDTH + 30,
                Math.random() * (SCREEN_HEIGHT - ENEMY_HEIGHT));
            this.enemies.push(enemy);
            this.scene.addChild(enemy);
        }
        for (i = 0; i < this.enemies.length; ++i) {
            enemy = this.enemies[i];
            enemy.update();
            if (enemy.x + enemy.width < 0 ) {
                this.scene.removeChild(enemy);
                this.enemies.splice(i, 1);
            }
            if (enemy.within(this.player, ENEMY_HIT_LENGTH)) {
                this.isGameOver = true;
            }
        }
    };

    /**
     *  アイテムの更新
     */
    World.prototype.updateItems = function() {
        var game = Game.instance;
        var i = 0;
        var item = null;
        var x = 0;
        var y = 0;
        var label = null;

        if (game.frame % 40 === 0) {
            var r = Math.floor(Math.random() * 100);
            x = SCREEN_WIDTH + 30;
            y = Math.random() * (SCREEN_HEIGHT - ITEM_HEIGHT);
            if (r < 10) item = new Diamond(x, y);
            else item = new Coin(x, y);
            this.items.push(item);
            this.scene.addChild(item);
        }
        for (i = 0; i < this.items.length; ++i) {
            item = this.items[i];
            item.update();
            if (item.x + item.width < 0) {
                this.scene.removeChild(item);
                this.items.splice(i, 1);
            }
            //  気球にあたったか
            if (item.intersect(this.player)) {
                // game.assets[ITEM_GET_SE].clone().play();
                label = new ScoreUpLabel(item.point);
                label.moveTo(item.x, item.y);
                this.scene.addChild(label);

                this.score += item.point;
                this.scene.removeChild(item);
                this.items.splice(i, 1);
            }
        }
    };

    return World
})();
