enchant()

window.onload = ->
    game = new Game(320, 480)
    game.fps = 30
    game.preload R.assets
    game.onload = ->
        @replaceScene new TitleScene()
    game.start()
