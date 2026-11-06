export class Droid {
    constructor(x = 12, y = 120) {
        this.x = x;
        this.y = y;
        this.vy = 0;
        this.life = 2;
        this.invincible = 0;
        this.sprite = 4;
    }
    isAlive() { return this.life > 0; }
    rise() { this.vy = Math.max(Droid.MAX_RISE, this.vy + Droid.RISE); }
    update(held, frame) {
        if (held && this.isAlive())
            this.rise();
        this.vy += this.isAlive() ? Droid.GRAVITY : Droid.GRAVITY + 0.2;
        this.y += this.vy;
        this.invincible = Math.max(0, this.invincible - 1);
        this.sprite = this.life * 2 + ((held || !this.life) ? Math.floor(frame / 4) % 2 : 0);
    }
    hitEnemy() {
        if (!this.invincible && this.isAlive()) {
            this.life--;
            this.invincible = this.life ? 31 : 0;
        }
    }
    render(renderer, frame) {
        if (!this.invincible || frame % 2) {
            renderer.sprite('player', this.x, this.y, Droid.WIDTH, Droid.HEIGHT, this.sprite);
        }
    }
}
Droid.WIDTH = 32;
Droid.HEIGHT = 32;
Droid.GRAVITY = 0.14;
Droid.MAX_RISE = -5;
Droid.RISE = -0.3;
