USE sample;

-- user_name=aaa, password=password
INSERT INTO
  account (user_name, password_hash, salt)
VALUES
  (
    'aaa',
    '$2a$10$UhHbeYW/0kl94zZR//zMtOt4FCZ3OFA07qa5ED/QTG/jXzD7H6SlW',
    '$2a$10$UhHbeYW/0kl94zZR//zMtO'
  );

-- user_name=bbb, password=password
INSERT INTO
  account (user_name, password_hash, salt)
VALUES
  (
    'bbb',
    '$2a$10$0yaSxRhvloRTvPusX/vbxe8JyZBqfdWlDgZ1UOAy.M4wtdaXiYI.i',
    '$2a$10$0yaSxRhvloRTvPusX/vbxe'
  );

INSERT INTO
  employee (id, name)
VALUES
  (1, "佐藤 東子");

INSERT INTO
  employee (id, name)
VALUES
  (2, "渡辺 里奈");

INSERT INTO
  employee (id, name)
VALUES
  (3, "坂田 浩一");

INSERT INTO
  employee (id, name)
VALUES
  (4, "香取 大輔");

INSERT INTO
  employee (id, name)
VALUES
  (5, "平林 成明");

INSERT INTO
  employee (id, name)
VALUES
  (6, "森田 優子");

INSERT INTO
  employee (id, name)
VALUES
  (7, "山本 美幸");

INSERT INTO
  employee (id, name)
VALUES
  (8, "金子 厚");

INSERT INTO
  employee (id, name)
VALUES
  (9, "河合 治");

INSERT INTO
  employee (id, name)
VALUES
  (10, "永井 達雄");

INSERT INTO
  skill (employee_id, language)
VALUES
  (1, "JavaScript");

INSERT INTO
  skill (employee_id, language)
VALUES
  (1, "HTML");

INSERT INTO
  skill (employee_id, language)
VALUES
  (1, "CSS");

INSERT INTO
  skill (employee_id, language)
VALUES
  (2, "Java");

INSERT INTO
  skill (employee_id, language)
VALUES
  (3, "C言語");

INSERT INTO
  skill (employee_id, language)
VALUES
  (4, "PHP");

INSERT INTO
  skill (employee_id, language)
VALUES
  (4, "Ruby");

INSERT INTO
  skill (employee_id, language)
VALUES
  (5, "Python");

INSERT INTO
  skill (employee_id, language)
VALUES
  (6, "Go");
