import type { Renderer } from './Renderer.js';

export class Droid {
  static readonly WIDTH = 32;
  static readonly HEIGHT = 32;
  static readonly GRAVITY = 0.14;
  static readonly MAX_RISE = -5;
  static readonly RISE = -0.3;
  vy = 0;
  life = 2;
  invincible = 0;
  sprite = 4;

  constructor(public x = 12, public y = 120) {}

  isAlive(): boolean { return this.life > 0; }

  rise(): void { this.vy = Math.max(Droid.MAX_RISE, this.vy + Droid.RISE); }

  update(held: boolean, frame: number): void {
    if (held && this.isAlive()) this.rise();
    this.vy += this.isAlive() ? Droid.GRAVITY : Droid.GRAVITY + 0.2;
    this.y += this.vy;
    this.invincible = Math.max(0, this.invincible - 1);
    this.sprite = this.life * 2 + ((held || !this.life) ? Math.floor(frame / 4) % 2 : 0);
  }

  hitEnemy(): void {
    if (!this.invincible && this.isAlive()) {
      this.life--;
      this.invincible = this.life ? 31 : 0;
    }
  }

  render(renderer: Renderer, frame: number): void {
    if (!this.invincible || frame % 2) {
      renderer.sprite('player', this.x, this.y, Droid.WIDTH, Droid.HEIGHT, this.sprite);
    }
  }
}
