enchant();

window.onload = function() {
    // ゲームオブジェクトの生成
    var game = new Game( SCREEN_WIDTH, SCREEN_HEIGHT );
    game.fps = 30;
    // 画像の読み込み
    game.preload( ASSETS );
    //  サウンド
    // game.assets[MAIN_BGM] = Sound.load(MAIN_BGM);
    // game.assets[ITEM_GET_SE] = Sound.load(ITEM_GET_SE);

    // ゲーム開始時の処理
    game.onload = function() {
        game.replaceScene( new TitleScene() );
    };

    game.start();
};
