import { PrismaClient } from 'generated/prisma';

const prisma = new PrismaClient();

/**
 * 既存データを全てクリアする
 */
async function cleanData(): Promise<void> {
  await prisma.skill.deleteMany({});
  await prisma.employee.deleteMany({});
  await prisma.account.deleteMany({});
}

/**
 * Accountsのダミーデータを作成する
 */
async function createDummyAccounts(): Promise<void> {
  const accounts = [
    {
      userName: 'aaa',
      passwordHash:
        '$2a$10$UhHbeYW/0kl94zZR//zMtOt4FCZ3OFA07qa5ED/QTG/jXzD7H6SlW',
      salt: '$2a$10$UhHbeYW/0kl94zZR//zMt',
    },
    {
      userName: 'bbb',
      passwordHash:
        '$2a$10$0yaSxRhvloRTvPusX/vbxe8JyZBqfdWlDgZ1UOAy.M4wtdaXiYI.i',
      salt: '$2a$10$0yaSxRhvloRTvPusX/vbxe',
    },
  ];
  for (const account of accounts) {
    await prisma.account.create({
      data: account,
    });
    console.log(`Created account: ${account.userName}`);
  }
  console.log(`Created ${accounts.length} accounts records`);
}

/**
 * Employeesのダミーデータを作成する
 */
async function createDummyEmployees(): Promise<void> {
  const employees = [
    {
      id: 1,
      name: '佐藤 東子',
    },
    {
      id: 2,
      name: '渡辺 里奈',
    },
    {
      id: 3,
      name: '坂田 浩一',
    },
    {
      id: 4,
      name: '香取 大輔',
    },
    {
      id: 5,
      name: '平林 成明',
    },
    {
      id: 6,
      name: '森田 優子',
    },
    {
      id: 7,
      name: '山本 美幸',
    },
    {
      id: 8,
      name: '金子 厚',
    },
    {
      id: 9,
      name: '河合 治',
    },
    {
      id: 10,
      name: '永井 達雄',
    },
  ];
  for (const employee of employees) {
    await prisma.employee.create({
      data: employee,
    });
    console.log(`Created employee: ${employee.name}`);
  }
  console.log(`Created ${employees.length} employees records`);
}

/**
 * Skillsのダミーデータを作成する
 */
async function createDummySkills(): Promise<void> {
  const skills = [
    {
      employeeId: 1,
      language: 'JavaScript',
    },
    {
      employeeId: 2,
      language: 'HTML',
    },
    {
      employeeId: 3,
      language: 'CSS',
    },
    {
      employeeId: 2,
      language: 'Java',
    },
    {
      employeeId: 3,
      language: 'C言語',
    },
    {
      employeeId: 4,
      language: 'PHP',
    },
    {
      employeeId: 4,
      language: 'Ruby',
    },
    {
      employeeId: 5,
      language: 'Python',
    },
    {
      employeeId: 6,
      language: 'Go',
    },
  ];
  for (const skill of skills) {
    await prisma.skill.create({
      data: skill,
    });
    console.log(`Created skill: ${skill.language}`);
  }
  console.log(`Created ${skills.length} skills records`);
}

async function main() {
  console.log('Seeding data...');
  // データクリーンアップ
  await cleanData();

  // ダミーデータを作成
  await createDummyAccounts();
  await createDummyEmployees();
  await createDummySkills();

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
