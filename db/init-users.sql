-- PostgreSQL ユーザー初期化スクリプト
-- アプリケーション用ユーザーを作成し、適切な権限を付与する

-- アプリケーション用ユーザーを作成
-- 環境変数 APP_USER_PASSWORD からパスワードを取得
\set app_password `echo $APP_USER_PASSWORD`
CREATE ROLE app_user LOGIN PASSWORD :'app_password';

-- publicスキーマへのアクセス権限を付与
GRANT USAGE ON SCHEMA public TO app_user;

-- テーブルの操作権限を付与
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;

-- シーケンスの操作権限を付与（SERIAL/IDENTITY カラムの INSERT 時に必要）
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_user;

-- マイグレーション後に作成されるテーブル・シーケンスにも自動的に権限を付与
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO app_user;
