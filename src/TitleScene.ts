import type { Scene, SceneContext } from './Scene.js';
import type { Renderer } from './Renderer.js';

export class TitleScene implements Scene {
  readonly acceptsRise = false;
  constructor(private readonly game: SceneContext) {}

  update(): void {}

  activate(x: number, y: number): void {
    if (x >= 10 && x <= 310 && y >= 235 && y < 335) this.game.start();
    else if (x >= 10 && x <= 310 && y >= 340 && y < 440) this.game.showScores();
  }

  keyDown(code: string): void {
    if (code === 'KeyH') this.game.showScores();
    else this.game.start();
  }

  render(renderer: Renderer): void {
    renderer.sprite('title_background', 0, 0, 320, 480);
    renderer.sprite('logo', 10, 13, 300, 200);
    renderer.sprite('start_button', 10, 235, 300, 100);
    renderer.sprite('highscore_button', 10, 340, 300, 100);
  }
}
