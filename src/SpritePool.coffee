#
# スプライトプール
#
class SpritePool
    constructor: (createSprite, maxPoolSize)->
        @sprites = []
        @createSprite = createSprite
        @maxPoolSize = maxPoolSize

    newSprite: ->
        if (@sprites.length == 0)
            sprite = @createSprite()
        else
            sprite = @sprites.pop()
        return sprite

    free: (sprite) ->
        if (@sprites.length < @maxPoolSize)
            @sprites.push sprite
