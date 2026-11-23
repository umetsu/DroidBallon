import { R, type ImageName } from './R.js';

/** Canvas drawing only; gameplay belongs to the scenes and World. */
export class Renderer {
  constructor(readonly ctx: CanvasRenderingContext2D, private readonly resources: R) {}

  clear(): void {
    this.ctx.fillStyle = '#00aaff';
    this.ctx.fillRect(0, 0, 320, 480);
  }

  sprite(name: ImageName, x: number, y: number, width: number, height: number,
    index = 0, scale = 1): void {
    const img = this.resources.get(name), columns = Math.floor(img.width / width);
    this.ctx.drawImage(img, (index % columns) * width, Math.floor(index / columns) * height,
      width, height, x, y, width * scale, height * scale);
  }

  text(value: string | number, x: number, y: number, alpha = 1): void {
    this.ctx.globalAlpha = alpha;
    for (const char of String(value)) {
      const code = char.charCodeAt(0) - 32;
      if (code >= 0 && code < 96) this.sprite('font0', x, y, 16, 16, code);
      x += 16;
    }
    this.ctx.globalAlpha = 1;
  }

  centered(value: string | number, y: number): void {
    this.text(value, (320 - String(value).length * 16) / 2, y);
  }
}
