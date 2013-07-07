#
# プレイヤーや敵の管理などを行うクラス
#
class World extends Group
    @GRAVITY = 0.14
    constructor: (scene) ->
        super
        @scene = scene
        @background = new Background()
        @addChild @background
        @player = new Droid(12, 120)
        @addChild @player
        @enemies = []
        @enemyPool = new SpritePool( ->
            return new EnemyDroid()
        , 5)
        @items = []
        @coinPool = new SpritePool( ->
            return new Coin()
        , 5)
        @diamondPool = new SpritePool( ->
            return new Diamond()
        , 3)
        @score = 0
        @scoreLabel = new ScoreLabel(10, 10)
        @scoreLabel.score = @score
        @addChild @scoreLabel

    update: ->
        @background.update()
        @updatePlayer()
        @updateEnemies()
        @updateItems()
        @scoreLabel.score = @score
        if (@player.isAlive())
            @checkEnemyCollisions()
            @checkItemCollisions()
        @checkGameOver()

    updatePlayer: ->
        if (@scene.isTouch)
            @player.rize() if @player.isAlive()
        @player.update()
        return

    updateEnemies: ->
        game = Game.instance
        if (game.frame % 25 == 0)
            enemy = @enemyPool.newSprite()
            enemy.initialize(
                GameScene.SCREEN_WIDTH + EnemyDroid.WIDTH,
                Math.random() * (GameScene.SCREEN_HEIGHT - EnemyDroid.HEIGHT))
            @enemies.push(enemy)
            @addChild(enemy)

        for enemy, i in @enemies
            enemy.update()

    checkEnemyCollisions: ->
        removeObjIndex = []
        for enemy, i in @enemies
            if (!enemy)
                return
            if (enemy.x + enemy.width < 0)
                removeObjIndex.push i
                continue
            if (enemy.within(@player, 20))
                removeObjIndex.push i
                @player.hitEnemy()
                @addChild new Explosion(@player.x, @player.y)

        for i in removeObjIndex
            enemy = @enemies[i]
            @removeChild enemy
            @enemyPool.free enemy
            @enemies.splice(i, 1)

    updateItems: ->
        game = Game.instance
        if (game.frame % 40 == 0)
            r = Math.floor(Math.random() * 100)
            if (r < 8)
                item = @diamondPool.newSprite()
            else
                item = @coinPool.newSprite()
            x = GameScene.SCREEN_WIDTH + 30
            y = Math.random() * (GameScene.SCREEN_HEIGHT - Item.WIDTH)
            item.initialize x, y
            @items.push item
            @addChild item

        for item, i in @items
            item.update()
        return

    checkItemCollisions: ->
        removeObjIndex = []
        for item, i in @items
            if (item.x + item.width < 0)
                removeObjIndex.push i
                continue
            # 気球にあたったか
            if (item.intersect(@player))
                removeObjIndex.push i
                label = new ScoreUpLabel(item.point)
                label.moveTo item.x, item.y
                @addChild label
                @score += item.point

        for i in removeObjIndex
            item = @items[i]
            @removeChild item
            if (item instanceof Coin)
                @coinPool.free item
            else
                @diamondPool.free item
            @items.splice(i, 1)

    checkGameOver: ->
        if (@player.y + @player.height < 0 or @player.y > GameScene.SCREEN_HEIGHT)
            @isGameOver = true
