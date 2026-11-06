export class Background {
    constructor() {
        this.x = 0;
    }
    update() {
        this.x -= 4;
        if (this.x + Background.WIDTH < 320)
            this.x = 0;
    }
    render(renderer) {
        renderer.sprite('background', this.x, 0, Background.WIDTH, Background.HEIGHT);
    }
}
Background.WIDTH = 1320;
Background.HEIGHT = 360;
