#
# ゲームシーン
#
class GameScene extends Scene
    # ゲームのスクリーン
    @SCREEN_WIDTH  = 320
    @SCREEN_HEIGHT = 360
    constructor: ->
        super @
        @backgroundColor = '#0af'
        @isTouch = false
        @world = new World(@)
        @addChild @world

        @upButton = new Sprite(320, 120)
        @upButton.image = Game.instance.assets[R.UPBUTTON_IMAGE]
        @upButton.y = GameScene.SCREEN_HEIGHT
        @addChild @upButton

        @update = @updateReady
        game = Game.instance
        @readyText = new MutableText()
        @readyText.text = "Ready..."
        @readyText.x = (GameScene.SCREEN_WIDTH - @readyText.width) / 2
        @readyText.y = (GameScene.SCREEN_HEIGHT - @readyText.height) / 2
        @addChild @readyText
        @time = game.getElapsedTime()

    ontouchstart: ->
        @isTouch = true
        @upButton.frame = 1

    ontouchend: ->
        @isTouch = false
        @upButton.frame = 0

    onenterframe: ->
        @update()

    updateReady: ->
        game = Game.instance
        if (game.getElapsedTime() - @time > 1.0)
            if (@readyText.text == 'Ready...')
                @readyText.text = 'Go!!'
                @readyText.x = (GameScene.SCREEN_WIDTH - @readyText.width) / 2
                @readyText.y = (GameScene.SCREEN_HEIGHT - @readyText.height) / 2
                @time = game.getElapsedTime()
            else
                @removeChild @readyText
                @update = @updateRunning

    updateRunning: ->
        game = Game.instance
        @world.update();
        if (@world.isGameOver)
            @gameOver()

    updateGameOver: ->
        game = Game.instance
        if (game.getElapsedTime() - @time < 0.5)
            return
        @end.visible = !@end.visible if game.frame % 14 == 0
        if (@isTouch)
            game.replaceScene new TitleScene()

    gameOver: ->
        game = Game.instance
        image = game.assets[R.END_IMAGE]
        @end = new Sprite(image.width, image.height)
        @end.image = image
        @end.x = (GameScene.SCREEN_WIDTH - @end.width) / 2
        @end.y = (GameScene.SCREEN_HEIGHT - @end.height) / 2
        @addChild @end
        @time = game.getElapsedTime()
        @update = @updateGameOver

        Settings.addScore @world.score
        Settings.save();
        Settings.load();
