import { GameScene } from './GameScene.js';
import { HighScoreScene } from './HighScoreScene.js';
import { InputController } from './InputController.js';
import { R } from './R.js';
import { Renderer } from './Renderer.js';
import { Settings } from './Settings.js';
import { TitleScene } from './TitleScene.js';
/** Owns browser resources, scene transitions, and the fixed 30fps loop. */
export class Game {
    constructor(canvas, status) {
        this.status = status;
        this.settings = new Settings();
        this.resources = new R();
        this.scene = null;
        this.frame = 0;
        this.last = null;
        this.accumulator = 0;
        this.loop = (now) => {
            if (this.last !== null && !document.hidden)
                this.accumulator += Math.min(now - this.last, 100);
            this.last = now;
            while (this.accumulator >= 1000 / 30) {
                this.frame++;
                this.scene?.update(this.frame);
                this.accumulator -= 1000 / 30;
            }
            this.renderer.clear();
            this.scene?.render(this.renderer, this.frame);
            requestAnimationFrame(this.loop);
        };
        const ctx = canvas.getContext('2d');
        if (!ctx)
            throw new Error('Canvas 2Dを利用できません。');
        this.renderer = new Renderer(ctx, this.resources);
        this.input = new InputController(canvas, (x, y) => {
            const before = this.scene;
            this.scene?.activate(x, y);
            return before === this.scene && this.scene?.acceptsRise === true;
        }, code => {
            if (code === 'Escape') {
                this.showTitle();
                return false;
            }
            const before = this.scene;
            this.scene?.keyDown(code);
            // Starting with Space/Up also holds ascent; leaving other scenes does not.
            return this.scene?.acceptsRise === true &&
                (before === this.scene || before instanceof TitleScene);
        });
    }
    async run() {
        this.settings.load();
        try {
            await this.resources.load();
            this.status.textContent = '画面を押す、またはSpace / ↑キーを長押しすると上昇します。Enter: 開始、H: ハイスコア、Esc: タイトル。';
            this.showTitle();
            requestAnimationFrame(this.loop);
        }
        catch (error) {
            this.status.textContent = `${error instanceof Error ? error.message : String(error)}。ページを再読み込みしてください。`;
        }
    }
    showTitle() { this.replaceScene(new TitleScene(this)); }
    start() { this.replaceScene(new GameScene(this)); }
    showScores() { this.replaceScene(new HighScoreScene(this)); }
    replaceScene(scene) {
        this.input.clear();
        this.scene = scene;
    }
}
