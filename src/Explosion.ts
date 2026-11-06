import type { Renderer } from './Renderer.js';

export class Explosion {
  age = 0;
  constructor(public x: number, public y: number) {}

  update(): boolean { return ++this.age < 10; }

  render(renderer: Renderer): void {
    renderer.sprite('effect0', this.x - 8, this.y - 8, 16, 16, Math.floor(this.age / 2), 2);
  }
}
