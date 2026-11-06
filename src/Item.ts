import { Droid } from './Droid.js';
import type { Renderer } from './Renderer.js';

export abstract class Item {
  static readonly WIDTH = 16;
  static readonly HEIGHT = 16;
  abstract readonly point: number;
  abstract readonly sprite: number;

  constructor(public x: number, public y: number) {}

  update(): void { this.x -= 4; }

  hits(player: Droid): boolean {
    return this.x < player.x + Droid.WIDTH && this.x + Item.WIDTH > player.x &&
      this.y < player.y + Droid.HEIGHT && this.y + Item.HEIGHT > player.y;
  }

  get offscreen(): boolean { return this.x + Item.WIDTH < 0; }

  render(renderer: Renderer): void {
    renderer.sprite('icon0', this.x, this.y, Item.WIDTH, Item.HEIGHT, this.sprite);
  }
}

export class Coin extends Item {
  readonly point = 100;
  readonly sprite = 14;
}

export class Diamond extends Item {
  readonly point = 1000;
  readonly sprite = 64;
}
