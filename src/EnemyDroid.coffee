#
# 敵
#
class EnemyDroid extends Sprite
    @WIDTH = 32
    @HEIGHT = 32
    @MOVE_VELOCITY = -5
    @HIT_LENGTH = 28

    constructor: ->
        super EnemyDroid.WIDTH, EnemyDroid.HEIGHT
        @image = Game.instance.assets[R.ENEMY_IMAGE]
        @initialize 0, 0

    initialize: (x, y) ->
        @time = 0
        @moveTo(x, y)
        @vx = EnemyDroid.MOVE_VELOCITY
        @vy = 0

    update: ->
        @vy = Math.sin(@time * 5 * Math.PI / 180)
        @x += @vx
        @y += @vy

        if (@time % 5 == 0)
            ++@frame
            @frame %= 2

        ++@time
        return
