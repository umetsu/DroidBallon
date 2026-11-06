export class TitleScene {
    constructor(game) {
        this.game = game;
        this.acceptsRise = false;
    }
    update() { }
    activate(x, y) {
        if (x >= 10 && x <= 310 && y >= 235 && y < 335)
            this.game.start();
        else if (x >= 10 && x <= 310 && y >= 340 && y < 440)
            this.game.showScores();
    }
    keyDown(code) {
        if (code === 'KeyH')
            this.game.showScores();
        else
            this.game.start();
    }
    render(renderer) {
        renderer.sprite('title_background', 0, 0, 320, 480);
        renderer.sprite('logo', 10, 13, 300, 200);
        renderer.sprite('start_button', 10, 235, 300, 100);
        renderer.sprite('highscore_button', 10, 340, 300, 100);
    }
}
