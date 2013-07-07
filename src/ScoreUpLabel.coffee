#
# アイテムとった時のスコアを表示
#
class ScoreUpLabel extends MutableText
    constructor: (score) ->
        MutableText.call @
        @text = '+' + score
        @time = 0

    onenterframe: ->
        game = Game.instance
        @y -= 0.1
        @opacity = 1.0 - (@time / game.fps)
        if (@time > game.fps)
            @parentNode.removeChild(@)
        @time += 1
