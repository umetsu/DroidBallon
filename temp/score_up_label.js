/*
 * スコアアップ
 */
var ScoreUpLabel = Class.create(MutableText, {
    // 初期化処理
    initialize: function(score) {
        MutableText.call(this);

        this.text   = '+' + score;
        this.time   = 0;
    },
    // ヒット時処理
    onenterframe: function() {
        // 移動
        this.y -= 0.1;
        // 透明度
        this.opacity = 1.0 - (this.time/30);

        // 削除
        if (this.time > 30) {
            this.parentNode.removeChild(this);
        }

        this.time += 1;
    }
});
