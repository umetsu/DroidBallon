/** Image resources shared by all scenes. */
const names = ['title_background', 'logo', 'start_button', 'highscore_button',
  'player', 'enemy', 'icon0', 'background', 'upbutton', 'effect0', 'end', 'font0'] as const;
export type ImageName = typeof names[number];

export class R {
  private readonly images = new Map<ImageName, HTMLImageElement>();

  async load(): Promise<void> {
    await Promise.all(names.map(name => new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => { this.images.set(name, img); resolve(); };
      img.onerror = () => reject(new Error(`画像を読み込めません: ${name}`));
      img.src = `assets/images/${name}.png`;
    })));
  }

  get(name: ImageName): HTMLImageElement {
    const image = this.images.get(name);
    if (!image) throw new Error(`画像が読み込まれていません: ${name}`);
    return image;
  }
}
