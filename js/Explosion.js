export class Explosion {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.age = 0;
    }
    update() { return ++this.age < 10; }
    render(renderer) {
        renderer.sprite('effect0', this.x - 8, this.y - 8, 16, 16, Math.floor(this.age / 2), 2);
    }
}
