/** Image resources shared by all scenes. */
const names = ['title_background', 'logo', 'start_button', 'highscore_button',
    'player', 'enemy', 'icon0', 'background', 'upbutton', 'effect0', 'end', 'font0'];
export class R {
    constructor() {
        this.images = new Map();
    }
    async load() {
        await Promise.all(names.map(name => new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => { this.images.set(name, img); resolve(); };
            img.onerror = () => reject(new Error(`画像を読み込めません: ${name}`));
            img.src = `assets/images/${name}.png`;
        })));
    }
    get(name) {
        const image = this.images.get(name);
        if (!image)
            throw new Error(`画像が読み込まれていません: ${name}`);
        return image;
    }
}
