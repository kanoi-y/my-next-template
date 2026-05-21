# my-next-template

本プロジェクトは [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack) で作成された、Next.js・Self・tRPC などを組み合わせたモダンな TypeScript スタックです。

## 機能

- **TypeScript** - 型安全性と開発体験の向上
- **Next.js** - フルスタック React フレームワーク
- **TailwindCSS** - ユーティリティファーストの CSS による迅速な UI 開発
- **Shared UI package** - shadcn/ui のプリミティブは `packages/ui` に配置
- **tRPC** - エンドツーエンドの型安全な API
- **Drizzle** - TypeScript ファーストの ORM
- **SQLite/Turso** - データベースエンジン
- **Biome** - リントとフォーマット
- **Turborepo** - 最適化されたモノレポビルドシステム

## セットアップ

まず依存関係をインストールします:

```bash
pnpm install
```

## データベースのセットアップ

本プロジェクトは Drizzle ORM と SQLite を使用します。

1. ローカルの SQLite データベースを起動します（任意）:

```bash
pnpm run db:local
```

2. 必要に応じて、`apps/web` ディレクトリ内の `.env` ファイルに適切な接続情報を設定します。

3. スキーマをデータベースに適用します:

```bash
pnpm run db:push
```

続いて開発サーバーを起動します:

```bash
pnpm run dev
```

ブラウザで [http://localhost:3001](http://localhost:3001) を開くと、フルスタックアプリケーションを確認できます。

## UI のカスタマイズ

本スタックの React Web アプリは、`packages/ui` を通じて shadcn/ui のプリミティブを共有します。

- デザイントークンとグローバルスタイルは `packages/ui/src/styles/globals.css` で変更
- 共有プリミティブは `packages/ui/src/components/*` で更新
- shadcn のエイリアスやスタイル設定は `packages/ui/components.json` と `apps/web/components.json` で調整

### 共有コンポーネントの追加

プロジェクトルートから次を実行すると、共有 UI パッケージにプリミティブを追加できます:

```bash
npx shadcn@latest add accordion dialog popover sheet table -c packages/ui
```

共有コンポーネントは次のようにインポートします:

```tsx
import { Button } from "@my-next-template/ui/components/button";
```

### アプリ固有のブロックの追加

共有プリミティブではなくアプリ固有のブロックを追加する場合は、`apps/web` から shadcn CLI を実行してください。

## デプロイ（Alchemy 経由の Cloudflare）

- 対象: web + server
- 開発: pnpm run dev
- デプロイ: pnpm run deploy
- 削除: pnpm run destroy

詳細は [Cloudflare への Alchemy デプロイガイド](https://www.better-t-stack.dev/docs/guides/cloudflare-alchemy) を参照してください。

## Git Hooks と Formatting

- フォーマットとリントの修正: `pnpm run check`

## プロジェクト構成

```
my-next-template/
├── apps/
│   └── web/         # Next.js フルスタックアプリ
├── packages/
│   ├── ui/          # 共有 shadcn/ui コンポーネントとスタイル
│   ├── api/         # API 層 / ビジネスロジック
│   └── db/          # データベーススキーマとクエリ
```

## 利用可能なスクリプト

- `pnpm run dev`: すべてのアプリケーションを開発モードで起動
- `pnpm run build`: すべてのアプリケーションをビルド
- `pnpm run dev:web`: Web アプリケーションのみを起動
- `pnpm run check-types`: 全アプリの TypeScript 型をチェック
- `pnpm run db:push`: スキーマ変更をデータベースに反映
- `pnpm run db:generate`: データベースクライアント / 型を生成
- `pnpm run db:migrate`: データベースマイグレーションを実行
- `pnpm run db:studio`: データベーススタジオ UI を開く
- `pnpm run db:local`: ローカルの SQLite データベースを起動
- `pnpm run check`: Biome によるフォーマットとリントを実行
