/** Preserves the original localStorage key and JSON format. */
export class Settings {
  highScores = [1000, 900, 800, 700, 600, 500, 400, 300, 200, 100];

  load(): void {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem('highScores') ?? 'null');
      if (typeof saved === 'object' && saved !== null && 'highScores' in saved &&
        Array.isArray(saved.highScores)) {
        const valid = saved.highScores.filter((n): n is number =>
          typeof n === 'number' && Number.isFinite(n) && n >= 0);
        if (valid.length) this.highScores = valid.sort((a, b) => b - a).slice(0, 10);
      }
    } catch { /* Storage can be blocked or contain invalid legacy data. */ }
  }

  addScore(score: number): void {
    this.highScores = [...this.highScores, score].sort((a, b) => b - a).slice(0, 10);
  }

  save(): void {
    try {
      localStorage.setItem('highScores', JSON.stringify({ highScores: this.highScores }));
    } catch { /* Playing remains possible when storage is blocked. */ }
  }
}
