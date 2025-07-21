-- PostgreSQL ユーザー初期化スクリプト
-- アプリケーション用ユーザーを作成し、適切な権限を付与する

-- アプリケーション用ユーザーを作成
-- 環境変数 APP_USER_PASSWORD からパスワードを取得
\set app_password `echo $APP_USER_PASSWORD`
CREATE ROLE app_user LOGIN PASSWORD :'app_password';

-- publicスキーマに対して、テーブルの作成権限を付与(マイグレーションで必要なため)
-- 本来は付与すべきではないが、開発環境で`prisma migrate reset`を効率的に行うためにこのようにしている
-- 本番環境ではアプリケーションユーザーに対してテーブルの作成と削除権限は付与すべきではない
GRANT CREATE ON SCHEMA public TO app_user;
