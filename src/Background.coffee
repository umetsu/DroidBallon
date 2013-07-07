#
# 背景
#
class Background extends Sprite
    @WIDTH           = 1320
    @HEIGHT          = 360
    @SCROLL_VELOCITY = -4
    constructor: ->
        super Background.WIDTH, Background.HEIGHT
        game = Game.instance
        @image = game.assets[R.BACKGROUND_IMAGE]
        @vx = Background.SCROLL_VELOCITY

    update: ->
        @x += @vx
        game = Game.instance
        if (@x + @width - GameScene.SCREEN_WIDTH < 0)
            @moveTo 0, 0
