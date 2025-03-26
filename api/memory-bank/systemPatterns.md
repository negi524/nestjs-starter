# システムアーキテクチャ

## アーキテクチャ

このアプリケーションは、NestJSに基づいたモジュール型アーキテクチャを採用しています。主要なモジュールは以下の通りです:

- `AppModule`: メインのエントリーポイントで、他のモジュールを集約
- `UserModule`: ユーザー認証と認可を担当
- `EmployeeModule`: 従業員プロファイルとスキルを管理
- `TasksModule`: 定期バッチ処理タスクを担当
- `HealthModule`: ヘルスチェックエンドポイントを提供

## 設計パターン

- **リポジトリパターン**: `PrismaService`がリポジトリの役割を果たし、データベース操作をカプセル化
- **ドメイン駆動設計**: `User`と`Employee`エンティティがコアドメインを表現し、`UserName`などの値オブジェクトを使用
- **依存性の注入**: NestJSの組み込み依存性注入を使用してサービスとコントローラーの関係を管理

## コンポーネントの関係

- `UserController`と`UserService`がユーザー関連の操作を担当
- `EmployeeController`と`EmployeeService`が従業員データを管理
- `TasksService`が定期タスクの調整を行う
- `HealthController`がアプリケーションの稼働状況を監視するエンドポイントを提供
