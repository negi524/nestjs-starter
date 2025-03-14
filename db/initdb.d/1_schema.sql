CREATE SCHEMA IF NOT EXISTS sample;

USE sample;

-- アカウントテーブルを作成する
CREATE TABLE IF NOT EXISTS account (
  user_id INT(10) NOT NULL AUTO_INCREMENT comment 'ユーザーID',
  user_name VARCHAR(255) UNIQUE NOT NULL comment 'ユーザー名',
  password_hash VARCHAR(255) NOT NULL comment 'パスワード',
  salt VARCHAR(100) NOT NULL comment 'パスワード用ソルト',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL comment 'アカウント作成日時',
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL comment '更新日時',
  is_active BOOLEAN DEFAULT TRUE NOT NULL comment 'アカウントが有効である',
  PRIMARY KEY (user_id)
) comment 'アカウントテーブル';

-- 従業員テーブルを作成する
CREATE TABLE IF NOT EXISTS employee (
  id INT(10) NOT NULL comment '従業員ID',
  name VARCHAR(40) NOT NULL comment '従業員名',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP comment 'レコード作成日時',
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP comment 'レコード更新日時',
  PRIMARY KEY (id)
) comment '従業員テーブル';

-- skillテーブルを作成する
CREATE TABLE IF NOT EXISTS skill (
  id INT(10) NOT NULL AUTO_INCREMENT comment 'スキルID',
  employee_id INT(10) NOT NULL comment '従業員ID',
  language VARCHAR(40) NOT NULL comment 'プログラミング言語',
  PRIMARY KEY (id),
  FOREIGN KEY (employee_id) REFERENCES employee (id)
) comment 'スキル情報';
