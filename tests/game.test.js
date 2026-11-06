import test from 'node:test';
import assert from 'node:assert/strict';
import { Droid } from '../js/Droid.js';
import { EnemyDroid } from '../js/EnemyDroid.js';
import { Coin, Diamond } from '../js/Item.js';
import { GameScene } from '../js/GameScene.js';
import { Settings } from '../js/Settings.js';
import { World } from '../js/World.js';

function context() {
  return {
    settings: { addScore(score) { this.scores.push(score); }, scores: [], save() { this.saves++; }, saves: 0 },
    input: { held: false, clear() { this.held = false; } },
    showTitle() { this.titles++; }, titles: 0,
  };
}

test('ascent is capped before gravity; a destroyed Droid falls faster', () => {
  const player = new Droid();
  for (let i = 0; i < 100; i++) player.update(true, i);
  assert.ok(Math.abs(player.vy - (-5 + 0.14)) < 1e-12);
  player.life = 0;
  player.vy = 0;
  player.update(true, 100);
  assert.ok(Math.abs(player.vy - 0.34) < 1e-12);
});

test('an enemy hit protects the player for 31 updates', () => {
  const player = new Droid();
  player.hitEnemy();
  player.hitEnemy();
  assert.equal(player.life, 1);
  for (let i = 0; i < 30; i++) player.update(false, i);
  player.hitEnemy();
  assert.equal(player.life, 1);
  player.update(false, 31);
  player.hitEnemy();
  assert.equal(player.life, 0);
  player.hitEnemy();
  assert.equal(player.life, 0);
});

test('World spawns enemies every 25 ticks and items every 40 ticks', () => {
  const world = new World();
  // Keep the player away from spawned objects and the game-over boundaries.
  for (let i = 1; i <= 40; i++) {
    world.player.y = 120;
    world.player.vy = 0;
    world.update(false, i);
    if (i === 24) assert.equal(world.enemies.length, 0);
    if (i === 25) assert.equal(world.enemies.length, 1);
    if (i === 39) assert.equal(world.items.length, 0);
  }
  assert.equal(world.items.length, 1);
  assert.equal(world.enemies[0].x, 352 - 16 * 5);
  assert.equal(world.items[0].x, 346);
});

test('collisions collect adjacent coins and diamonds without skipping entries', () => {
  const world = new World();
  world.items.push(new Coin(16, 120), new Diamond(16, 120));
  world.enemies.push(new EnemyDroid(17, 120), new EnemyDroid(17, 120));
  world.update(false, 1);
  assert.equal(world.player.life, 1);
  assert.equal(world.enemies.length, 0);
  assert.equal(world.effects.length, 2);
  assert.equal(world.items.length, 0);
  assert.equal(world.score, 1100);
  assert.deepEqual(world.labels.map(label => label.point), [100, 1000]);
  for (let i = 0; i < 31; i++) world.update(false, i + 2);
  assert.equal(world.labels.length, 0);
  assert.equal(world.effects.length, 0);
});

test('a dead player cannot collect items; offscreen objects are removed', () => {
  const world = new World();
  world.player.life = 0;
  world.items.push(new Coin(16, 120), new Coin(-17, 0));
  world.enemies.push(new EnemyDroid(-33, 0));
  world.update(false, 1);
  assert.equal(world.score, 0);
  assert.equal(world.items.length, 1);
  assert.equal(world.enemies.length, 0);
});

test('Ready lasts 62 ticks; game over saves once and waits 15 ticks before returning', () => {
  const game = context();
  const scene = new GameScene(game);
  for (let i = 1; i <= 61; i++) scene.update(i);
  assert.equal(scene.state, 'ready');
  assert.equal(scene.world.player.y, 120);
  scene.update(62);
  assert.equal(scene.state, 'playing');
  assert.equal(scene.world.runningTicks, 0);
  scene.world.score = 1500;
  scene.world.player.y = 361;
  game.input.held = true;
  scene.update(63);
  assert.equal(scene.state, 'over');
  assert.equal(game.input.held, false);
  assert.deepEqual(game.settings.scores, [1500]);
  scene.activate();
  assert.equal(game.titles, 0);
  for (let i = 0; i < 15; i++) scene.update(64 + i);
  scene.activate();
  assert.equal(game.titles, 1);
  assert.equal(game.settings.saves, 1);
});

test('Settings reads the legacy format, sorts valid numbers, and keeps the top 10', () => {
  let saved;
  globalThis.localStorage = {
    getItem: key => {
      assert.equal(key, 'highScores');
      return JSON.stringify({ highScores: [100, '500', -1, null, 300, 200] });
    },
    setItem: (key, value) => { assert.equal(key, 'highScores'); saved = JSON.parse(value); },
  };
  const settings = new Settings();
  settings.load();
  assert.deepEqual(settings.highScores, [300, 200, 100]);
  for (let i = 1; i <= 12; i++) settings.addScore(i * 1000);
  settings.save();
  assert.equal(saved.highScores.length, 10);
  assert.equal(saved.highScores[0], 12000);
  assert.equal(saved.highScores[9], 3000);
  delete globalThis.localStorage;
});

test('Settings tolerates broken data and blocked storage', () => {
  for (const value of ['{', 'null', '{}', '{"highScores":[]}', '{"highScores":["bad",-1]}']) {
    globalThis.localStorage = { getItem: () => value };
    const settings = new Settings();
    settings.load();
    assert.equal(settings.highScores.length, 10);
    assert.equal(settings.highScores[0], 1000);
  }
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true, get() { throw new Error('blocked'); },
  });
  const settings = new Settings();
  assert.doesNotThrow(() => settings.load());
  settings.addScore(2000);
  assert.doesNotThrow(() => settings.save());
  assert.equal(settings.highScores[0], 2000);
  delete globalThis.localStorage;
});
