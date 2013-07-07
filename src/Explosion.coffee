#
# 爆発
#
class Explosion extends Sprite
    @WIDTH = 16
    @HEIGHT = 16
    constructor: (x, y) ->
        super Explosion.WIDTH, Explosion.HEIGHT
        @image = Game.instance.assets[R.EXPLOSION_IMAGE]
        @moveTo x, y
        @frame = 0
        @scale 2

    onenterframe: ->
        ++@frame
        if (@frame > 10)
            @parentNode.removeChild @

