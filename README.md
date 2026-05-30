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

1. [Turso Platform CLI](https://docs.turso.tech/cli/introduction) をインストールします（`pnpm run db:local` に必要）。npm の `turso` パッケージ（`npx turso`）とは別物です。

   macOS:

   ```bash
   brew install tursodatabase/tap/turso
   ```

   その他:

   ```bash
   curl -sSfL https://get.tur.so/install.sh | bash
   ```

2. ローカルの libSQL サーバーを起動します（任意）:

   ```bash
   pnpm run db:local
   ```

   `http://127.0.0.1:8080` でサーバーが起動し、変更は `packages/db/local.db` に永続化されます。

   停止する場合:

   ```bash
   pnpm run db:local:stop
   ```

   `Address already in use (os error 48)` が出る場合は、前回の `sqld` がポート 8080 を占有したまま残っています。`pnpm run db:local:stop` を実行してから再度 `pnpm run db:local` を起動してください。手動で止める場合は `kill $(lsof -ti :8080)` でも構いません。

3. `apps/web/.env` に接続情報を設定します。ローカル開発の例:

   ```env
   DATABASE_URL=http://127.0.0.1:8080
   DATABASE_AUTH_TOKEN=
   ```

4. スキーマをデータベースに適用します:

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

## 依存関係アップデート運用（Renovate）

- 通常の依存関係アップデートは、Renovate により **月1回（毎月1日）** にまとめてPR作成されます。
- セキュリティ脆弱性に関するアップデートは `vulnerabilityAlerts` を有効化しているため、月次スケジュールを待たずに優先してPR作成されます。
- 設定ファイルは `renovate.json`（リポジトリルート）です。

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

## テスト

本プロジェクトは [Vitest](https://vitest.dev/) を使用します。テストファイルは各パッケージの `src` 配下に `*.test.ts` / `*.test.tsx` として配置します。

- `packages/api` — tRPC ルーターなどのユニットテスト（Node 環境）
- `packages/ui` — 共有 UI コンポーネントのテスト（jsdom + Testing Library）
- `apps/web` — Vitest 設定のみ（テスト追加時に利用）

```bash
pnpm test              # 全パッケージのテストを実行
pnpm test:coverage     # カバレッジ付きで実行
pnpm test:watch        # ウォッチモード
```

## 利用可能なスクリプト

- `pnpm run dev`: すべてのアプリケーションを開発モードで起動
- `pnpm run build`: すべてのアプリケーションをビルド
- `pnpm run dev:web`: Web アプリケーションのみを起動
- `pnpm run check-types`: 全アプリの TypeScript 型をチェック
- `pnpm test`: 全パッケージの Vitest テストを実行
- `pnpm test:coverage`: カバレッジ付きでテストを実行
- `pnpm test:watch`: テストをウォッチモードで実行
- `pnpm run db:push`: スキーマ変更をデータベースに反映
- `pnpm run db:generate`: データベースクライアント / 型を生成
- `pnpm run db:migrate`: データベースマイグレーションを実行
- `pnpm run db:studio`: データベーススタジオ UI を開く
- `pnpm run db:local`: ローカルの SQLite データベースを起動
- `pnpm run db:local:stop`: ローカルの SQLite データベースを停止
- `pnpm run check`: Biome によるフォーマットとリントを実行
