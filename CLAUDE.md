# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## リポジトリ概要

NestJS を用いた WebAPI テンプレートのモノレポ構成。DockerCompose でローカル環境を管理する。

```
api/          # NestJS WebAPI アプリケーション
db/           # データベース設定
docker-compose.yml
```

## 開発コマンド

すべてのコマンドは `api/` ディレクトリ内で実行する。

### 起動・ビルド

```bash
pnpm run start:dev    # ウォッチモードで起動
pnpm run build        # プロダクションビルド
pnpm run start:prod   # ビルド済みアプリを起動
```

### テスト

```bash
pnpm run test                              # 全ユニットテスト (Vitest)
pnpm run test -- path/to/file.spec.ts      # 単一ファイルのテスト
pnpm run test -- --grep "テスト名"          # パターン一致テスト
pnpm run test:e2e                          # E2E テスト (NODE_ENV=local が自動設定)
pnpm run test:e2e -- path/to/file.e2e-spec.ts  # 単一 E2E テスト
pnpm run test:cov                          # カバレッジレポート
```

### コード品質

```bash
pnpm run lint         # ESLint (自動修正付き)
pnpm run format       # Prettier フォーマット
pnpm run format:check # フォーマットチェックのみ
```

### データベース

```bash
pnpm run prisma:generate         # Prisma クライアント生成 (初回必須)
pnpm run prisma:migrate:dev      # マイグレーション実行
pnpm run prisma:migrate:reset    # DB リセット
pnpm run prisma:db:seed          # シードデータ投入
```

## アーキテクチャ

Clean Architecture (DDD) を採用している。

```
src/
├── presentation/     # HTTP 層 (Controller, DTO, Filter)
├── application/      # ユースケース層 (UseCase, Service)
├── domain/           # ドメイン層 (Model/ValueObject, Repository インターface, Exception)
├── infrastructure/   # インフラ層 (Repository 実装, Adapter)
├── prisma/           # PrismaService & seed
└── config/           # 環境変数バリデーション, OpenTelemetry
```

### 依存の方向

`presentation → application → domain ← infrastructure`

- Repository のインターフェースは `domain/repository/` に定義し、実装は `infrastructure/repository/` に置く
- Controller は UseCase を呼び出す。UseCase が Repository インターフェースに依存する
- ドメインモデルはフレームワーク・ORM に依存しない

### Value Object パターン

`domain/model/` 配下にある Value Object は static ファクトリメソッド (`.from()`, `.generate()`) を使う。Password などはハッシュ化ロジックをカプセル化している。

### テストファイルの配置

テストは `api/test/` に `src/` と同じディレクトリ構成で配置する。

```
test/
├── domain/model/       # Value Object のユニットテスト
├── presentation/       # Controller のユニットテスト
└── e2e/               # E2E テスト (Supertest)
```

## 主要技術

- **フレームワーク**: NestJS v11
- **ORM**: Prisma v7 (PostgreSQL, `@prisma/adapter-pg`)
- **Prisma クライアント出力先**: `generated/prisma/client`
- **テスト**: Vitest v3 (Jest ではない)
- **ロギング**: nestjs-pino (JSON形式、NODE_ENV=local のみ pretty-print)
- **観測性**: OpenTelemetry (W3C Trace Context、pino にトレースID自動注入)
- **API ドキュメント**: Swagger (`/api` エンドポイント)
- **バリデーション**: class-validator + class-transformer

## 環境変数

`config/env.validation.ts` でバリデーション済み。必須変数:

- `NODE_ENV`: `development` | `production` | `local`
- `DATABASE_URL`: PostgreSQL 接続文字列
- `TZ`: タイムゾーン (デフォルト: `Asia/Tokyo`)
