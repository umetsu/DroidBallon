export class ScoreUpLabel {
    constructor(x, y, point) {
        this.x = x;
        this.y = y;
        this.point = point;
        this.age = 0;
    }
    update() {
        this.y -= 0.1;
        return ++this.age <= 30;
    }
    render(renderer) {
        renderer.text(`+${this.point}`, this.x, this.y, 1 - this.age / 31);
    }
}
