import type { Renderer } from './Renderer.js';

export class ScoreUpLabel {
  age = 0;
  constructor(public x: number, public y: number, readonly point: number) {}

  update(): boolean {
    this.y -= 0.1;
    return ++this.age <= 30;
  }

  render(renderer: Renderer): void {
    renderer.text(`+${this.point}`, this.x, this.y, 1 - this.age / 31);
  }
}
