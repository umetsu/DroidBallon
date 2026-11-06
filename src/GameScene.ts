import type { Scene, SceneContext } from './Scene.js';
import type { Renderer } from './Renderer.js';
import { World } from './World.js';

export class GameScene implements Scene {
  static readonly SCREEN_WIDTH = 320;
  static readonly SCREEN_HEIGHT = 360;
  readonly world = new World();
  state: 'ready' | 'playing' | 'over' = 'ready';
  ticks = 0;

  constructor(private readonly game: SceneContext) {}

  get acceptsRise(): boolean { return this.state !== 'over'; }

  activate(): void {
    if (this.state === 'over' && this.ticks >= 15) this.game.showTitle();
  }

  keyDown(): void { this.activate(); }

  update(frame: number): void {
    if (this.state === 'ready') {
      if (++this.ticks >= 62) { this.state = 'playing'; this.ticks = 0; }
      return;
    }
    if (this.state === 'over') { this.ticks++; return; }
    this.world.update(this.game.input.held, frame);
    if (this.world.isGameOver) this.gameOver();
  }

  private gameOver(): void {
    this.state = 'over';
    this.ticks = 0;
    this.game.input.clear();
    this.game.settings.addScore(this.world.score);
    this.game.settings.save();
  }

  render(renderer: Renderer, frame: number): void {
    const ctx = renderer.ctx;
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, GameScene.SCREEN_WIDTH, GameScene.SCREEN_HEIGHT);
    ctx.clip();
    this.world.render(renderer, frame);
    ctx.restore();
    renderer.sprite('upbutton', 0, 360, 320, 120, this.game.input.held ? 1 : 0);
    if (this.state === 'ready') renderer.centered(this.ticks < 31 ? 'Ready...' : 'Go!!', 172);
    if (this.state === 'over' && (this.ticks < 15 || Math.floor(frame / 14) % 2 === 0)) {
      renderer.sprite('end', 65.5, 131.5, 189, 97);
    }
  }
}
