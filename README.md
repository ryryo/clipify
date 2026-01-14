# Clipify

**Webコンテンツクリッパー - Webページを複数の形式で変換、抽出、保存**

Clipifyは、Markdown、HTML、スクリーンショットなど、さまざまな形式でWebコンテンツを抽出、変換、保存できる強力なブラウザ拡張機能です。最新のWeb技術で構築され、生産性向上のために設計されています。

## ✨ 機能

- **スマートコンテンツ抽出**: MozillaのReadabilityアルゴリズムを使用して、Webページからクリーンで読みやすいコンテンツを抽出
- **Markdown変換**: YAMLフロントマター付きの整ったMarkdown形式にWebページを変換
- **複数のエクスポート形式**: 
  - メタデータ付きMarkdown
  - クリーンなHTML
  - ページスクリーンショット
- **ワンクリック操作**: クリップボードにコピーまたはファイルを即座にダウンロード
- **豊富なメタデータ**: タイトル、公開日、単語数などを自動抽出
- **テーブル対応**: テーブルをMarkdown形式にインテリジェントに変換
- **クロスブラウザ対応**: ChromeとFirefoxで動作

## 🚀 インストール

### 開発環境のセットアップ

1. **リポジトリをクローン**
   ```bash
   git clone https://github.com/ryryo/clipify.git
   cd clipify
   ```

2. **依存関係をインストール**
   ```bash
   npm install
   ```

3. **開発サーバーを起動**
   ```bash
   # Chrome用
   npm run dev
   
   # Firefox用
   npm run dev:firefox
   ```

4. **拡張機能を読み込む**
   - **Chrome**: `chrome://extensions/`を開き、デベロッパーモードを有効にして「パッケージ化されていない拡張機能を読み込む」をクリックし、`.output/chrome-mv3`フォルダを選択
   - **Firefox**: `about:debugging`を開き、「このFirefox」をクリック、「一時的なアドオンを読み込む」をクリックし、`.output/firefox-mv2`からマニフェストファイルを選択

### 本番ビルド

```bash
# Chrome用にビルド
npm run build

# Firefox用にビルド
npm run build:firefox

# 配布パッケージを作成
npm run zip
npm run zip:firefox
```

## 🎯 使い方

1. **クリップしたい任意のWebページに移動**
2. **ブラウザツールバーのClipify拡張機能アイコンをクリック**
3. **自動コンテンツ抽出を待つ** - 拡張機能がReadabilityを使用してページを解析
4. **希望のアクションを選択**:
   - **Markdownをコピー**: フォーマットされたMarkdownをクリップボードにコピー
   - **Markdownをダウンロード**: `.md`ファイルとして保存
   - **HTMLをコピー**: クリーンなHTMLをクリップボードにコピー
   - **HTMLをダウンロード**: `.html`ファイルとして保存
   - **スクリーンショットをコピー**: ページスクリーンショットをクリップボードにコピー
   - **スクリーンショットを保存**: ページスクリーンショットをダウンロード

## 📋 出力形式

### YAMLフロントマター付きMarkdown

```markdown
---
title: "記事タイトル"
source_url: "https://example.com/article"
source: "Example Site"
published_time: "2024-01-01T00:00:00Z"
extracted_at: "2024-01-01T12:00:00Z"
word_count: 1500
content_length: 8000
excerpt: "記事の要約..."
---

# 記事コンテンツ

変換されたMarkdownコンテンツがここに表示されます...
```

### Markdown変換の機能

- **YAMLフロントマター**: ソースURL、公開日、単語数などの豊富なメタデータ
- **クリーンなフォーマット**: 適切な見出し階層、リスト、強調
- **テーブル対応**: HTMLテーブルをMarkdownテーブル形式に変換
- **コードブロックの保持**: フェンス付きコードブロックでコードフォーマットを維持
- **リンクの処理**: リンクをインラインMarkdown形式に変換

## 🛠️ 技術詳細

### アーキテクチャ

- **フレームワーク**: [WXT](https://wxt.dev/)で構築 - モダンなWeb拡張機能フレームワーク
- **UI**: TypeScriptを使用したReact 19
- **コンテンツ抽出**: クリーンなコンテンツ抽出のためのMozilla Readability
- **Markdown変換**: カスタムルール付きTurndown.js
- **ビルドシステム**: Viteを活用した開発とビルドプロセス

### 主要コンポーネント

- **バックグラウンドスクリプト**: 拡張機能のライフサイクルを処理
- **コンテンツスクリプト**: コンテンツ抽出のためにWebページに注入
- **ポップアップインターフェース**: ユーザーインタラクション用のReactベースUI
- **コンバーターユーティリティ**: カスタムMarkdown変換ロジック
- **スクリーンショットユーティリティ**: ページキャプチャ機能

### ブラウザ権限

- `activeTab`: 現在のタブコンテンツへのアクセス
- `clipboardWrite`: コンテンツをクリップボードにコピー
- `tabs`: ブラウザタブのクエリとインタラクション

## 🧪 開発

### 利用可能なスクリプト

```bash
# 開発
npm run dev              # Chrome開発サーバーを起動
npm run dev:firefox      # Firefox開発サーバーを起動

# ビルド
npm run build            # Chrome用にビルド
npm run build:firefox    # Firefox用にビルド
npm run zip              # Chrome配布パッケージを作成
npm run zip:firefox      # Firefox配布パッケージを作成

# コード品質
npm run lint             # ESLintを実行
npm run lint:fix         # ESLintの問題を修正
npm run format           # Prettierでコードをフォーマット
npm run format:check     # コードフォーマットをチェック
npm run compile          # TypeScriptコンパイルチェック
npm run check            # すべてのチェックを実行（コンパイル + リント + フォーマット）
npm run fix              # すべての問題を修正（リント + フォーマット）
```

### プロジェクト構造

```
├── entrypoints/
│   ├── background.ts           # バックグラウンドスクリプト
│   ├── content.ts             # ページインタラクション用コンテンツスクリプト
│   └── popup/                 # ポップアップUIコンポーネント
│       ├── App.tsx            # メインアプリコンポーネント
│       ├── components/        # Reactコンポーネント
│       └── hooks/             # カスタムReactフック
├── utils/
│   ├── converter.ts           # Markdown変換ロジック
│   └── screenshot.ts          # スクリーンショットユーティリティ
├── types/
│   └── index.ts              # TypeScript型定義
├── public/
│   └── icon/                 # 拡張機能アイコン
└── wxt.config.ts             # WXT設定
```

### コード品質ツール

- **ESLint**: Reactルールを使用したJavaScript/TypeScriptリンティング
- **Prettier**: コードフォーマット
- **TypeScript**: 型安全性とより良い開発体験
- **React**: フックを使用したモダンなUI開発

## 🤝 コントリビューション

1. リポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更を加える
4. 品質チェックを実行 (`npm run check`)
5. 変更をコミット (`git commit -m 'Add amazing feature'`)
6. ブランチにプッシュ (`git push origin feature/amazing-feature`)
7. プルリクエストを開く

### 開発ガイドライン

- 既存のコードスタイルに従う（ESLintとPrettierで強制）
- 新機能にTypeScript型を追加
- ChromeとFirefoxの両方で変更をテスト
- 新機能のドキュメントを更新

## 📝 ライセンス

このプロジェクトはMITライセンスの下でライセンスされています - 詳細は[LICENSE](LICENSE)ファイルを参照してください。

## 🐛 問題報告とサポート

問題が発生した場合や機能リクエストがある場合は、GitHubで[issueを作成](https://github.com/ryryo/clipify/issues)してください。

## 🙏 謝辞

- [Mozilla Readability](https://github.com/mozilla/readability) - コンテンツ抽出アルゴリズム
- [Turndown](https://github.com/mixmark-io/turndown) - HTMLからMarkdownへの変換
- [WXT](https://wxt.dev/) - モダンなWeb拡張機能開発フレームワーク
- [React](https://react.dev/) - UIフレームワーク

---

**生産性向上を愛する人々のために ❤️ で作られました**
