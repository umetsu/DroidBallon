import type { Droid } from './Droid.js';
import type { Renderer } from './Renderer.js';

export class EnemyDroid {
  static readonly WIDTH = 32;
  static readonly HEIGHT = 32;
  time = 0;

  constructor(public x: number, public y: number) {}

  update(): void {
    this.x -= 5;
    this.y += Math.sin(this.time++ * 5 * Math.PI / 180);
  }

  hits(player: Droid): boolean {
    return Math.hypot(this.x - player.x, this.y - player.y) < 20;
  }

  get offscreen(): boolean { return this.x + EnemyDroid.WIDTH < 0; }

  render(renderer: Renderer): void {
    renderer.sprite('enemy', this.x, this.y, EnemyDroid.WIDTH, EnemyDroid.HEIGHT,
      Math.floor(this.time / 5) % 2);
  }
}
