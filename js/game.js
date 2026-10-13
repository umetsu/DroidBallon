/* DroidBallon — browser-native Canvas renderer. No runtime dependencies. */
(() => {
  'use strict';
  const canvas = document.querySelector('#game');
  const ctx = canvas.getContext('2d');
  const status = document.querySelector('#status');
  const images = {};
  const names = ['title_background', 'logo', 'start_button', 'highscore_button',
    'player', 'enemy', 'icon0', 'background', 'upbutton', 'effect0', 'end', 'font0'];
  const defaults = [1000, 900, 800, 700, 600, 500, 400, 300, 200, 100];
  let scores = defaults.slice();
  try {
    const saved = JSON.parse(localStorage.getItem('highScores'));
    if (Array.isArray(saved?.highScores)) {
      const valid = saved.highScores.filter(n => Number.isFinite(n) && n >= 0);
      if (valid.length) scores = valid.sort((a, b) => b - a).slice(0, 10);
    }
  } catch { /* Storage can be blocked or contain invalid legacy data. */ }
  let scene = 'loading', world, frame = 0;
  const pointers = new Set();
  const keys = new Set();
  const held = () => pointers.size > 0 || keys.size > 0;
  function clearInput() { pointers.clear(); keys.clear(); }
  function title() { scene = 'title'; clearInput(); }
  function start() {
    clearInput();
    scene = 'ready';
    world = {ticks: 0, runningTicks: 0, backgroundX: 0, score: 0,
      player: {x: 12, y: 120, vy: 0, life: 2, invincible: 0, sprite: 4},
      enemies: [], items: [], effects: [], labels: []};
  }
  function activate(x, y) {
    if (scene === 'title') {
      if (x >= 10 && x <= 310 && y >= 235 && y < 335) start();
      else if (x >= 10 && x <= 310 && y >= 340 && y < 440) { scene = 'scores'; clearInput(); }
    } else if (scene === 'scores') title();
    else if (scene === 'over' && world.ticks >= 15) title();
  }
  canvas.addEventListener('pointerdown', event => {
    event.preventDefault();
    canvas.focus();
    const rect = canvas.getBoundingClientRect();
    const before = scene;
    activate((event.clientX - rect.left) * 320 / rect.width,
      (event.clientY - rect.top) * 480 / rect.height);
    if (before === scene && (scene === 'ready' || scene === 'playing')) {
      pointers.add(event.pointerId);
      canvas.setPointerCapture(event.pointerId);
    }
  });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) {
    canvas.addEventListener(type, event => pointers.delete(event.pointerId));
  }
  window.addEventListener('keydown', event => {
    if (!['Space', 'ArrowUp', 'Enter', 'Escape', 'KeyH'].includes(event.code)) return;
    event.preventDefault();
    if (event.repeat) return;
    if (event.code === 'Escape') { title(); return; }
    if (scene === 'title') {
      if (event.code === 'KeyH') scene = 'scores';
      else {
        start();
        if (event.code === 'Space' || event.code === 'ArrowUp') keys.add(event.code);
      }
    } else if (scene === 'scores') title();
    else if (scene === 'over') { if (world.ticks >= 15) title(); }
    else if (event.code === 'Space' || event.code === 'ArrowUp') keys.add(event.code);
  });
  window.addEventListener('keyup', event => keys.delete(event.code));
  window.addEventListener('blur', clearInput);
  document.addEventListener('visibilitychange', clearInput);
  function finish() {
    scene = 'over'; world.ticks = 0; clearInput();
    scores = [...scores, world.score].sort((a, b) => b - a).slice(0, 10);
    try { localStorage.setItem('highScores', JSON.stringify({highScores: scores})); } catch { }
  }
  function update() {
    frame++;
    if (scene === 'ready') {
      if (++world.ticks >= 62) { scene = 'playing'; world.ticks = 0; }
      return;
    }
    if (scene === 'over') { world.ticks++; return; }
    if (scene !== 'playing') return;
    const w = world, p = w.player;
    w.runningTicks++;
    w.backgroundX -= 4;
    if (w.backgroundX + 1320 < 320) w.backgroundX = 0;
    if (held() && p.life > 0) p.vy = Math.max(-5, p.vy - 0.3);
    p.vy += p.life > 0 ? 0.14 : 0.34;
    p.y += p.vy;
    p.invincible = Math.max(0, p.invincible - 1);
    p.sprite = p.life * 2 + ((held() || !p.life) ? Math.floor(frame / 4) % 2 : 0);
    if (w.runningTicks % 25 === 0) w.enemies.push({x: 352, y: Math.random() * 328, time: 0});
    if (w.runningTicks % 40 === 0) w.items.push({x: 350, y: Math.random() * 344, diamond: Math.random() < 0.08});
    w.effects = w.effects.filter(e => ++e.age < 10);
    w.labels = w.labels.filter(l => { l.y -= 0.1; return ++l.age <= 30; });
    w.enemies = w.enemies.filter(e => {
      e.x -= 5; e.y += Math.sin(e.time++ * 5 * Math.PI / 180);
      if (e.x + 32 < 0) return false;
      if (p.life > 0 && Math.hypot(e.x - p.x, e.y - p.y) < 20) {
        if (!p.invincible) { p.life--; p.invincible = p.life ? 31 : 0; }
        w.effects.push({x: p.x, y: p.y, age: 0});
        return false;
      }
      return true;
    });
    w.items = w.items.filter(i => {
      i.x -= 4;
      if (i.x + 16 < 0) return false;
      if (p.life > 0 && i.x < p.x + 32 && i.x + 16 > p.x && i.y < p.y + 32 && i.y + 16 > p.y) {
        const point = i.diamond ? 1000 : 100;
        w.score += point; w.labels.push({x: i.x, y: i.y, point, age: 0});
        return false;
      }
      return true;
    });
    if (p.y + 32 < 0 || p.y > 360) finish();
  }
  function sprite(name, x, y, width, height, index = 0, scale = 1) {
    const img = images[name], columns = Math.floor(img.width / width);
    ctx.drawImage(img, (index % columns) * width, Math.floor(index / columns) * height,
      width, height, x, y, width * scale, height * scale);
  }
  function text(value, x, y, alpha = 1) {
    ctx.globalAlpha = alpha;
    for (const char of String(value)) {
      const code = char.charCodeAt(0) - 32;
      if (code >= 0 && code < 96) sprite('font0', x, y, 16, 16, code);
      x += 16;
    }
    ctx.globalAlpha = 1;
  }
  const centered = (value, y) => text(value, (320 - String(value).length * 16) / 2, y);
  function render() {
    ctx.fillStyle = '#00aaff'; ctx.fillRect(0, 0, 320, 480);
    if (scene === 'title' || scene === 'scores') {
      sprite('title_background', 0, 0, 320, 480);
      if (scene === 'title') {
        sprite('logo', 10, 13, 300, 200);
        sprite('start_button', 10, 235, 300, 100);
        sprite('highscore_button', 10, 340, 300, 100);
      } else scores.forEach((score, i) => centered(`${i + 1}. ${score}`, 60 + i * 30));
      return;
    }
    if (!world) return;
    const w = world, p = w.player;
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 320, 360); ctx.clip();
    sprite('background', w.backgroundX, 0, 1320, 360);
    if (!p.invincible || frame % 2) sprite('player', p.x, p.y, 32, 32, p.sprite);
    for (const e of w.enemies) sprite('enemy', e.x, e.y, 32, 32, Math.floor(e.time / 5) % 2);
    for (const i of w.items) sprite('icon0', i.x, i.y, 16, 16, i.diamond ? 64 : 14);
    for (const e of w.effects) sprite('effect0', e.x - 8, e.y - 8, 16, 16, Math.floor(e.age / 2), 2);
    for (const l of w.labels) text(`+${l.point}`, l.x, l.y, 1 - l.age / 31);
    text(`SCORE:${w.score}`, 10, 10);
    ctx.restore();
    sprite('upbutton', 0, 360, 320, 120, held() ? 1 : 0);
    if (scene === 'ready') centered(w.ticks < 31 ? 'Ready...' : 'Go!!', 172);
    if (scene === 'over' && (w.ticks < 15 || Math.floor(frame / 14) % 2 === 0)) sprite('end', 65.5, 131.5, 189, 97);
  }
  let last = null, accumulator = 0;
  function loop(now) {
    if (last !== null && !document.hidden) accumulator += Math.min(now - last, 100);
    last = now;
    while (accumulator >= 1000 / 30) { update(); accumulator -= 1000 / 30; }
    render(); requestAnimationFrame(loop);
  }
  Promise.all(names.map(name => new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => { images[name] = img; resolve(); };
    img.onerror = () => reject(new Error(`画像を読み込めません: ${name}`));
    img.src = `assets/images/${name}.png`;
  }))).then(() => {
    status.textContent = '画面を押す、またはSpace / ↑キーを長押しすると上昇します。Enter: 開始、H: ハイスコア、Esc: タイトル。';
    title(); requestAnimationFrame(loop);
  }).catch(error => { status.textContent = error.message + '。ページを再読み込みしてください。'; });
})();
