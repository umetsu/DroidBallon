import { Droid } from './Droid.js';
export class Item {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    update() { this.x -= 4; }
    hits(player) {
        return this.x < player.x + Droid.WIDTH && this.x + Item.WIDTH > player.x &&
            this.y < player.y + Droid.HEIGHT && this.y + Item.HEIGHT > player.y;
    }
    get offscreen() { return this.x + Item.WIDTH < 0; }
    render(renderer) {
        renderer.sprite('icon0', this.x, this.y, Item.WIDTH, Item.HEIGHT, this.sprite);
    }
}
Item.WIDTH = 16;
Item.HEIGHT = 16;
export class Coin extends Item {
    constructor() {
        super(...arguments);
        this.point = 100;
        this.sprite = 14;
    }
}
export class Diamond extends Item {
    constructor() {
        super(...arguments);
        this.point = 1000;
        this.sprite = 64;
    }
}
