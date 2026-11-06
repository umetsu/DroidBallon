/** Converts browser events into scene actions and held ascent input. */
export class InputController {
    constructor(canvas, activate, keyDown) {
        this.pointers = new Set();
        this.keys = new Set();
        canvas.addEventListener('pointerdown', event => {
            event.preventDefault();
            canvas.focus();
            const rect = canvas.getBoundingClientRect();
            if (activate((event.clientX - rect.left) * 320 / rect.width, (event.clientY - rect.top) * 480 / rect.height)) {
                this.pointers.add(event.pointerId);
                canvas.setPointerCapture(event.pointerId);
            }
        });
        for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) {
            canvas.addEventListener(type, event => this.pointers.delete(event.pointerId));
        }
        window.addEventListener('keydown', event => {
            if (!['Space', 'ArrowUp', 'Enter', 'Escape', 'KeyH'].includes(event.code))
                return;
            event.preventDefault();
            if (event.repeat)
                return;
            if (keyDown(event.code) && InputController.isRiseKey(event.code))
                this.keys.add(event.code);
        });
        window.addEventListener('keyup', event => this.keys.delete(event.code));
        window.addEventListener('blur', () => this.clear());
        document.addEventListener('visibilitychange', () => this.clear());
    }
    static isRiseKey(code) { return code === 'Space' || code === 'ArrowUp'; }
    get held() { return this.pointers.size > 0 || this.keys.size > 0; }
    clear() { this.pointers.clear(); this.keys.clear(); }
}
