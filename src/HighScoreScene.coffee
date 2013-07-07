#
# スコア表示のシーン
#
class HighScoreScene extends Scene
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

        highScores = []
        y = 60
        for i in [0...10]
            highScores[i] = new MutableText()
            highScores[i].text = (i + 1) + '. ' + Settings.highScores[i]
            highScores[i].x = (game.width - highScores[i].width) / 2
            highScores[i].y = y
            y += 30
            @addChild highScores[i]

    ontouchstart: ->
        game = Game.instance
        game.replaceScene new TitleScene()

