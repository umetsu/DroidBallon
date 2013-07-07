#
# アイテムの元となるクラス
#
class Item extends Sprite
    @WIDTH = 16
    @HEIGHT = 16
    @MOVE_VELOCITY = -4
    constructor: ->
        super Item.WIDTH, Item.HEIGHT
        game = Game.instance
        @image = game.assets[R.ICON_IMAGE]
        @point = 0

    initialize: (x, y) ->
        @moveTo(x, y)
        @vx = Item.MOVE_VELOCITY

    update: ->
        @x += @vx
        return

#
# コイン。ポイント低い
#
class Coin extends Item
    @FRAME = 14
    @POINT = 100
    constructor: ->
        super
        @frame = Coin.FRAME
        @point = Coin.POINT
        return

#
# ダイヤモンド。ポイント高い
#
class Diamond extends Item
    @FRAME = 64
    @POINT = 1000
    constructor: ->
        super
        @frame = Diamond.FRAME
        @point = Diamond.POINT
        return
