import type { Renderer } from './Renderer.js';

export class Background {
  static readonly WIDTH = 1320;
  static readonly HEIGHT = 360;
  x = 0;

  update(): void {
    this.x -= 4;
    if (this.x + Background.WIDTH < 320) this.x = 0;
  }

  render(renderer: Renderer): void {
    renderer.sprite('background', this.x, 0, Background.WIDTH, Background.HEIGHT);
  }
}
