#
# タイトルシーン
#
class TitleScene extends Scene
    constructor: ->
        super @
        @backgroundColor = '#0af'
        game = Game.instance

        image = game.assets[R.TITLE_BACKGROUND_IMAGE]
        background = new Sprite(image.width, image.height)
        background.image = image
        background.x = 0
        background.y = 0
        @addChild background

        image = game.assets[R.TITLE_LOGO_IMAGE]
        logo = new Sprite(image.width, image.height)
        logo.image = image
        logo.x = (game.width - logo.width) / 2
        logo.y = 13
        @addChild logo

        image = game.assets[R.START_BUTTON_IMAGE]
        start = new Sprite(image.width, image.height / 2)
        start.image = image
        start.x = (game.width - start.width) / 2
        start.y = 235
        start.addEventListener 'touchstart', ->
            game.replaceScene new GameScene()
        @addChild start

        image = game.assets[R.HIGHSCORE_BUTTON_IMAGE]
        highscore = new Sprite(image.width, image.height / 2)
        highscore.image = image
        highscore.x = (game.width - highscore.width) / 2
        highscore.y = 340
        highscore.addEventListener 'touchstart', ->
            game.replaceScene new HighScoreScene()
        @addChild highscore

        Settings.load()
