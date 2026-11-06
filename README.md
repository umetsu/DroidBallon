# DroidBallon

Canvas 2D、Pointer Events、requestAnimationFrameで動作するブラウザゲームです。
ソースはTypeScriptです。実行時の外部ライブラリへの依存はありません。
元の画像素材、30fpsの物理挙動、コイン・ダイヤ・敵、ハイスコアを引き継いでいます。

## 起動

生成済みの`js/`を同梱しているため、遊ぶだけならNode.jsやビルドは不要です。
ES Modulesを使うため、このディレクトリをHTTPサーバーで配信してください（`file://`での直接起動は非対応です）。

```sh
python3 -m http.server 8000
```

その後 `http://localhost:8000` を開きます。外部CDNへの接続は不要です。
Chrome、Edge、Firefox、SafariなどCanvasとPointer Eventsに対応した現代のブラウザ向けです。

## 開発

Node.jsとnpmをインストールしてから実行してください。

```sh
npm ci
npm run check  # strictモードで型チェック
npm test       # ビルドと回帰テスト
npm run watch  # 編集時にjs/を再生成
```

`src/`を編集し、`npm run build`で生成した`js/`も一緒にコミットしてください。
TypeScriptのみを開発依存として使い、バンドラーや実行時ライブラリは使いません。

旧CoffeeScriptの責務分担に沿ってクラスを分けています。

- `Main` / `Game`: 起動、リソース読み込み、30fpsループ、画面遷移
- `TitleScene` / `HighScoreScene` / `GameScene`: タイトル、ランキング、Ready・プレイ・ゲームオーバー
- `World`: オブジェクトの管理、出現、衝突判定、スコア
- `Droid` / `EnemyDroid`: プレイヤーと敵の移動・状態・描画
- `Item` / `Coin` / `Diamond`: アイテムの共通動作と種類ごとの得点・画像
- `Background` / `Explosion` / `ScoreUpLabel`: 背景と演出
- `Settings`: 従来形式のハイスコア保存・読み込み
- `R` / `Renderer` / `InputController`: 画像、Canvas描画、ブラウザ入力

旧enchant.jsの継承やグローバルな`Game.instance`は使わず、必要な依存を渡します。
PR #2と同様に配列でオブジェクトを管理し、旧`SpritePool`は導入していません。

## 操作

- STARTボタン、EnterキーまたはSpaceキーで開始します。
- マウス・タッチの長押し、Spaceキー・上矢印キーの長押しで上昇します。
- HキーまたはHIGH SCOREボタンでハイスコアを表示します。
- ゲームオーバー後は画面を押してタイトルへ戻れます。Escキーでも戻れます。

ハイスコアは従来と同じ`highScores`キーでlocalStorageへ保存します。
保存が禁止されている場合や保存データが壊れている場合もプレイできます。
ウィンドウのフォーカスを失ったときは入力を解除し、非表示タブではゲームの時間を停止します。

[元のエンジニアブログ](https://blog.engineer.adways.net/entry/25761762)
