import type { Scene, SceneContext } from './Scene.js';
import type { Renderer } from './Renderer.js';

export class HighScoreScene implements Scene {
  readonly acceptsRise = false;
  constructor(private readonly game: SceneContext) {}

  update(): void {}
  activate(): void { this.game.showTitle(); }
  keyDown(): void { this.game.showTitle(); }

  render(renderer: Renderer): void {
    renderer.sprite('title_background', 0, 0, 320, 480);
    this.game.settings.highScores.forEach((score, i) => renderer.centered(`${i + 1}. ${score}`, 60 + i * 30));
  }
}
