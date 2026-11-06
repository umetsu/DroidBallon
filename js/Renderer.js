/** Canvas drawing only; gameplay belongs to the scenes and World. */
export class Renderer {
    constructor(ctx, resources) {
        this.ctx = ctx;
        this.resources = resources;
    }
    clear() {
        this.ctx.fillStyle = '#00aaff';
        this.ctx.fillRect(0, 0, 320, 480);
    }
    sprite(name, x, y, width, height, index = 0, scale = 1) {
        const img = this.resources.get(name), columns = Math.floor(img.width / width);
        this.ctx.drawImage(img, (index % columns) * width, Math.floor(index / columns) * height, width, height, x, y, width * scale, height * scale);
    }
    text(value, x, y, alpha = 1) {
        this.ctx.globalAlpha = alpha;
        for (const char of String(value)) {
            const code = char.charCodeAt(0) - 32;
            if (code >= 0 && code < 96)
                this.sprite('font0', x, y, 16, 16, code);
            x += 16;
        }
        this.ctx.globalAlpha = 1;
    }
    centered(value, y) {
        this.text(value, (320 - String(value).length * 16) / 2, y);
    }
}
