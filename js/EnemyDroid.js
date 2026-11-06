export class EnemyDroid {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.time = 0;
    }
    update() {
        this.x -= 5;
        this.y += Math.sin(this.time++ * 5 * Math.PI / 180);
    }
    hits(player) {
        return Math.hypot(this.x - player.x, this.y - player.y) < 20;
    }
    get offscreen() { return this.x + EnemyDroid.WIDTH < 0; }
    render(renderer) {
        renderer.sprite('enemy', this.x, this.y, EnemyDroid.WIDTH, EnemyDroid.HEIGHT, Math.floor(this.time / 5) % 2);
    }
}
EnemyDroid.WIDTH = 32;
EnemyDroid.HEIGHT = 32;
