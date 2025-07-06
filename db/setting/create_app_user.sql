-- アプリケーション用のロールを新規作成する
CREATE ROLE app_user LOGIN PASSWORD 'Password!';

-- 作成したロールにテーブル操作の権限を付与する
GRANT INSERT,
SELECT
,
UPDATE,
DELETE ON ALL TABLES in SCHEMA public TO app_user;
