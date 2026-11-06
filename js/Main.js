import { Game } from './Game.js';
const canvas = document.querySelector('#game');
const status = document.querySelector('#status');
if (!canvas || !status)
    throw new Error('ゲームの表示要素が見つかりません。');
void new Game(canvas, status).run();
