import { World } from './World.js';
export class GameScene {
    constructor(game) {
        this.game = game;
        this.world = new World();
        this.state = 'ready';
        this.ticks = 0;
    }
    get acceptsRise() { return this.state !== 'over'; }
    activate() {
        if (this.state === 'over' && this.ticks >= 15)
            this.game.showTitle();
    }
    keyDown() { this.activate(); }
    update(frame) {
        if (this.state === 'ready') {
            if (++this.ticks >= 62) {
                this.state = 'playing';
                this.ticks = 0;
            }
            return;
        }
        if (this.state === 'over') {
            this.ticks++;
            return;
        }
        this.world.update(this.game.input.held, frame);
        if (this.world.isGameOver)
            this.gameOver();
    }
    gameOver() {
        this.state = 'over';
        this.ticks = 0;
        this.game.input.clear();
        this.game.settings.addScore(this.world.score);
        this.game.settings.save();
    }
    render(renderer, frame) {
        const ctx = renderer.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, GameScene.SCREEN_WIDTH, GameScene.SCREEN_HEIGHT);
        ctx.clip();
        this.world.render(renderer, frame);
        ctx.restore();
        renderer.sprite('upbutton', 0, 360, 320, 120, this.game.input.held ? 1 : 0);
        if (this.state === 'ready')
            renderer.centered(this.ticks < 31 ? 'Ready...' : 'Go!!', 172);
        if (this.state === 'over' && (this.ticks < 15 || Math.floor(frame / 14) % 2 === 0)) {
            renderer.sprite('end', 65.5, 131.5, 189, 97);
        }
    }
}
GameScene.SCREEN_WIDTH = 320;
GameScene.SCREEN_HEIGHT = 360;
