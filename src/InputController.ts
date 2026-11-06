/** Converts browser events into scene actions and held ascent input. */
export class InputController {
  private readonly pointers = new Set<number>();
  private readonly keys = new Set<string>();

  constructor(canvas: HTMLCanvasElement,
    activate: (x: number, y: number) => boolean,
    keyDown: (code: string) => boolean) {
    canvas.addEventListener('pointerdown', event => {
      event.preventDefault();
      canvas.focus();
      const rect = canvas.getBoundingClientRect();
      if (activate((event.clientX - rect.left) * 320 / rect.width,
        (event.clientY - rect.top) * 480 / rect.height)) {
        this.pointers.add(event.pointerId);
        canvas.setPointerCapture(event.pointerId);
      }
    });
    for (const type of ['pointerup', 'pointercancel', 'lostpointercapture'] as const) {
      canvas.addEventListener(type, event => this.pointers.delete(event.pointerId));
    }
    window.addEventListener('keydown', event => {
      if (!['Space', 'ArrowUp', 'Enter', 'Escape', 'KeyH'].includes(event.code)) return;
      event.preventDefault();
      if (event.repeat) return;
      if (keyDown(event.code) && InputController.isRiseKey(event.code)) this.keys.add(event.code);
    });
    window.addEventListener('keyup', event => this.keys.delete(event.code));
    window.addEventListener('blur', () => this.clear());
    document.addEventListener('visibilitychange', () => this.clear());
  }

  static isRiseKey(code: string): boolean { return code === 'Space' || code === 'ArrowUp'; }

  get held(): boolean { return this.pointers.size > 0 || this.keys.size > 0; }

  clear(): void { this.pointers.clear(); this.keys.clear(); }
}
