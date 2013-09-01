#
# プレイヤー
#
class Droid extends Sprite
    @WIDTH = 32
    @HEIGHT = 32
    @MAX_RISE = -5.0
    @RISE = -0.3
    constructor: (x, y)->
        super Droid.WIDTH, Droid.HEIGHT
        @image = Game.instance.assets[R.PLAYER_IMAGE]
        @moveTo(x, y)
        @vy = 0
        @frame = 4
        @life = 2
        @update = @updateFlying
        @isRise = false
        @invincibleTime = 0

    rise: ->
        @isRise = true
        @vy += Droid.RISE
        if (@vy < Droid.MAX_RISE)
            @vy = Droid.MAX_RISE

    updateFlying: ->
        game = Game.instance
        @vy += World.GRAVITY
        @y += @vy

        frameWidth = 2
        if (@isRise)
            @frame = (1 - @frame % frameWidth) + @life * frameWidth if game.frame % 4 == 0
        else
            @frame = @life * frameWidth
        @isRise = false

        if (@invincibleTime > 0)
            @visible = !@visible if game.frame % 2 == 0
            if (game.frame - @invincibleTime > 30)
                @state = Droid.STATE_FLYING
                @visible = true
                @invincibleTime = 0

    updateFall: ->
        game = Game.instance
        @vy += World.GRAVITY + 0.2
        @y += @vy
        frameWidth = 2
        @frame = (1 - @frame % frameWidth) + @life * frameWidth if game.frame % 4 == 0

    hitEnemy: ->
        return if @invincibleTime > 0 or !@isAlive()
        --@life
        if (@life > 0)
            @invincibleTime = Game.instance.frame
        else
            @update = @updateFall

    isAlive: ->
        @life > 0
