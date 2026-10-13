# DroidBallon

Canvas 2D、Pointer Events、requestAnimationFrameで動作するブラウザゲームです。
enchant.js、Underscore、CoffeeScriptおよびビルドツールは不要です。
元の画像素材、30fpsの物理挙動、コイン・ダイヤ・敵、ハイスコアを引き継いでいます。

## 起動

`index.html`をブラウザで開くか、このディレクトリで次のコマンドを実行してください。

```sh
python3 -m http.server 8000
```

その後 `http://localhost:8000` を開きます。外部CDNへの接続は不要です。
Chrome、Edge、Firefox、SafariなどCanvasとPointer Eventsに対応した現代のブラウザ向けです。

## 操作

- STARTボタン、EnterキーまたはSpaceキーで開始します。
- マウス・タッチの長押し、Spaceキー・上矢印キーの長押しで上昇します。
- HキーまたはHIGH SCOREボタンでハイスコアを表示します。
- ゲームオーバー後は画面を押してタイトルへ戻れます。Escキーでも戻れます。

ハイスコアは従来と同じ`highScores`キーでlocalStorageへ保存します。
保存が禁止されている場合や保存データが壊れている場合もプレイできます。
ウィンドウのフォーカスを失ったときは入力を解除し、非表示タブではゲームの時間を停止します。

[元のエンジニアブログ](https://blog.engineer.adways.net/entry/25761762)
