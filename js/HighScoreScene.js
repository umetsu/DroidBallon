export class HighScoreScene {
    constructor(game) {
        this.game = game;
        this.acceptsRise = false;
    }
    update() { }
    activate() { this.game.showTitle(); }
    keyDown() { this.game.showTitle(); }
    render(renderer) {
        renderer.sprite('title_background', 0, 0, 320, 480);
        this.game.settings.highScores.forEach((score, i) => renderer.centered(`${i + 1}. ${score}`, 60 + i * 30));
    }
}
