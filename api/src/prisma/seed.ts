import 'dotenv/config';
import { Pool } from "pg";
import { fakerJA } from '@faker-js/faker';
import * as bcrypt from 'bcryptjs';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client';

const faker = fakerJA;
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

/**
 * 既存データを全てクリアする
 */
async function cleanData(): Promise<void> {
  await prisma.skillEntity.deleteMany({});
  await prisma.employeeEntity.deleteMany({});
  await prisma.accountEntity.deleteMany({});
}

const languages = [
  'JavaScript',
  'HTML',
  'CSS',
  'Java',
  'C言語',
  'PHP',
  'Ruby',
  'Python',
  'Go',
];
let employeeIds: string[] = [];

/**
 * Accountsのダミーデータを作成する
 */
async function createDummyAccounts(): Promise<void> {
  const accounts = Array.from({ length: 10 }).map(() => {
    const password = 'Passw0rd!';
    const salt = bcrypt.genSaltSync(12);
    const hashedValue = bcrypt.hashSync(password, salt);
    return {
      name: faker.person.fullName(),
      passwordHash: hashedValue,
      salt: salt,
    };
  });
  for (const account of accounts) {
    await prisma.accountEntity.create({
      data: account,
    });
    console.log(`Created account: ${account.name}`);
  }
  console.log(`Created ${accounts.length} accounts records`);
}

/**
 * Employeesのダミーデータを作成する
 */
async function createDummyEmployees(): Promise<void> {
  const employees = Array.from({ length: 20 }).map(() => {
    return {
      id: faker.string.ulid(),
      name: faker.person.fullName(),
    };
  });

  employeeIds = employees.map((item) => item.id);

  for (const employee of employees) {
    await prisma.employeeEntity.create({
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
  const skills = Array.from({ length: 50 }).map(() => {
    return {
      employeeId: faker.helpers.arrayElement(employeeIds),
      language: faker.helpers.arrayElement(languages),
    };
  });
  for (const skill of skills) {
    await prisma.skillEntity.create({
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
  .catch(async (e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
