// import 'dotenv/config';
// import { PrismaClient } from '../generated/prisma/client.js';
// import { PrismaPg } from '@prisma/adapter-pg';

// const adapter = new PrismaPg({
//   connectionString: process.env.DATABASE_URL,
// });

// const prisma = new PrismaClient({ adapter });

// async function main() {
//   console.log('Starting seed...');

//   const testUser = await prisma.user.upsert({
//     where: { email: 'test@example.com' },
//     update: {},
//     create: {
//       email: 'test@example.com',
//       name: 'Test User',
//     },
//   });

//   console.log('Test user created:', testUser);
//   console.log('Seed completed successfully!');
// }

// main()
//   .catch((e) => {
//     console.error('Error during seed:', e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

import 'dotenv/config';
import bcrypt from 'bcrypt';
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting seed...');

  const hashedPassword = await bcrypt.hash('123456', 10);

  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {
      name: 'Test User',
      password: hashedPassword,
      role: 'user',
    },
    create: {
      email: 'test@example.com',
      name: 'Test User',
      password: hashedPassword,
      role: 'user',
    },
  });

  console.log('Test user created:', testUser);
  console.log('Login data:');
  console.log('email: test@example.com');
  console.log('password: 123456');
  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
