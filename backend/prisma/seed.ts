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
      firstName: 'Test',
      lastName: 'User',
      passwordHash: hashedPassword,
      role: 'USER',
    },
    create: {
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      passwordHash: hashedPassword,
      role: 'USER',
    },
  });

  const test2User = await prisma.user.upsert({
    where: { email: 'test2@example.com' },
    update: {
      firstName: 'test2',
      lastName: 'User',
      passwordHash: hashedPassword,
      role: 'USER',
    },
    create: {
      email: 'test2@example.com',
      firstName: 'test2',
      lastName: 'User',
      passwordHash: hashedPassword,
      role: 'USER',
    },
  });

  const testEvent = await prisma.event.upsert({
    where: {
      id: 'test-event-id',
    },
    update: {
      title: 'Test Event',
      description: 'Test event description',
      date: new Date(),
      location: 'Berlin',
      capacity: 100,
      organizerId: testUser.id,
    },
    create: {
      id: 'test-event-id',
      title: 'Test Event',
      description: 'Test event description',
      date: new Date(),
      location: 'Berlin',
      capacity: 100,
      organizerId: testUser.id,
    },
  });

  await prisma.attendance.createMany({
    data: [
      { userId: testUser.id, eventId: testEvent.id },
      { userId: test2User.id, eventId: testEvent.id },
    ],
    skipDuplicates: true,
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
