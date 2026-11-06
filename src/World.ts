import { Background } from './Background.js';
import { Droid } from './Droid.js';
import { EnemyDroid } from './EnemyDroid.js';
import { Coin, Diamond, Item } from './Item.js';
import { Explosion } from './Explosion.js';
import { ScoreUpLabel } from './ScoreUpLabel.js';
import type { Renderer } from './Renderer.js';

/** Owns game entities, spawning, collisions, and score. */
export class World {
  readonly background = new Background();
  readonly player = new Droid();
  enemies: EnemyDroid[] = [];
  items: Item[] = [];
  effects: Explosion[] = [];
  labels: ScoreUpLabel[] = [];
  runningTicks = 0;
  score = 0;

  update(held: boolean, frame: number): void {
    this.runningTicks++;
    this.background.update();
    this.player.update(held, frame);
    if (this.runningTicks % 25 === 0) {
      this.enemies.push(new EnemyDroid(352, Math.random() * 328));
    }
    if (this.runningTicks % 40 === 0) {
      const y = Math.random() * 344;
      this.items.push(Math.random() < 0.08 ? new Diamond(350, y) : new Coin(350, y));
    }
    this.effects = this.effects.filter(effect => effect.update());
    this.labels = this.labels.filter(label => label.update());
    this.updateEnemies();
    this.updateItems();
  }

  private updateEnemies(): void {
    this.enemies = this.enemies.filter(enemy => {
      enemy.update();
      if (enemy.offscreen) return false;
      if (this.player.isAlive() && enemy.hits(this.player)) {
        this.player.hitEnemy();
        this.effects.push(new Explosion(this.player.x, this.player.y));
        return false;
      }
      return true;
    });
  }

  private updateItems(): void {
    this.items = this.items.filter(item => {
      item.update();
      if (item.offscreen) return false;
      if (this.player.isAlive() && item.hits(this.player)) {
        this.score += item.point;
        this.labels.push(new ScoreUpLabel(item.x, item.y, item.point));
        return false;
      }
      return true;
    });
  }

  get isGameOver(): boolean {
    return this.player.y + Droid.HEIGHT < 0 || this.player.y > 360;
  }

  render(renderer: Renderer, frame: number): void {
    this.background.render(renderer);
    this.player.render(renderer, frame);
    for (const enemy of this.enemies) enemy.render(renderer);
    for (const item of this.items) item.render(renderer);
    for (const effect of this.effects) effect.render(renderer);
    for (const label of this.labels) label.render(renderer);
    renderer.text(`SCORE:${this.score}`, 10, 10);
  }
}
