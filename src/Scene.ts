import type { InputController } from './InputController.js';
import type { Renderer } from './Renderer.js';
import type { Settings } from './Settings.js';

/** Dependencies used by scenes, without coupling them to the main loop. */
export interface SceneContext {
  readonly settings: Settings;
  readonly input: Pick<InputController, 'held' | 'clear'>;
  showTitle(): void;
  start(): void;
  showScores(): void;
}

export interface Scene {
  readonly acceptsRise: boolean;
  update(frame: number): void;
  render(renderer: Renderer, frame: number): void;
  activate(x: number, y: number): void;
  keyDown(code: string): void;
}
