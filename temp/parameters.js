//==========================================================
//  定数類
//==========================================================

//
//  パラメータ
//
//  スクリーン
var SCREEN_WIDTH     = 320;  // スクリーンの幅
var SCREEN_HEIGHT    = 320;  // スクリーンの高さ

var GRAVIRY          = 0.15; // 重力

// 風船
var BALLON_WIDTH     = 32;   // 幅
var BALLON_HEIGHT    = 32;   // 高さ
var BALLON_RISE      = -0.3; // 浮かび上がる強さ

//  敵
var ENEMY_WIDTH      = 32;   // 幅
var ENEMY_HEIGHT     = 32;   // 高さ
var ENEMY_SPEED      = -5;   // 移動スピード
var ENEMY_HIT_LENGTH = 20;   // 衝突判定の領域サイズ

//  アイテム
var ITEM_WIDTH       = 16;   // 幅
var ITEM_HEIGHT      = 16;   // 高さ
var ITEM_SPEED       = -4;   // アイテムのスピード
var COIN_POINT       = 100;  // コインのポイント
var COIN_FRAME       = 14;   // コイン画像のフレームインデックス
var DIAMOND_POINT    = 1000; // ダイアモンドのポイント
var DIAMOND_FRAME    = 64;   // ダイアモンドのフレームインデックス

//  背景
var BACKGROUND_WIDTH        = 1320;
var BACKGROUND_HEIGHT       = 320;
var BACKGROUND_SCROLL_SPEED = -4;

//
//  アセット
//
//  画像
var START_IMAGE      = 'assets/images/start.png';
var END_IMAGE        = 'assets/images/end.png';
var PLAYER_IMAGE     = "assets/images/player.png";
var ENEMY_IMAGE      = "assets/images/enemy.png";
var ICON_IMAGE       = "assets/images/icon0.png";
var BACKGROUND_IMAGE = "assets/images/background.png";
// 音
var MAIN_BGM         = "assets/sounds/main_bgm.wav";
var ITEM_GET_SE      = "assets/sounds/itemget.wav";

var ASSETS = [
    START_IMAGE,
    END_IMAGE,
    PLAYER_IMAGE,
    ENEMY_IMAGE,
    ICON_IMAGE,
    BACKGROUND_IMAGE
];
