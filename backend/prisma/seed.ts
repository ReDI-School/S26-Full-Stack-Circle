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

  // Create test users
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

  const organizer = await prisma.user.upsert({
    where: { email: 'organizer@example.com' },
    update: {
      firstName: 'John',
      lastName: 'Organizer',
      passwordHash: hashedPassword,
      role: 'USER',
    },
    create: {
      email: 'organizer@example.com',
      firstName: 'John',
      lastName: 'Organizer',
      passwordHash: hashedPassword,
      role: 'USER',
    },
  });

  // Create mock events
  const event1 = await prisma.event.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      title: 'How to Network',
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
      date: new Date('2025-04-04T14:17:00Z'),
      location: 'Berlin, Germany',
      capacity: 40,
      organizerId: organizer.id,
    },
  });

  const event2 = await prisma.event.upsert({
    where: { id: '2' },
    update: {},
    create: {
      id: '2',
      title: 'Web Development Workshop',
      description: 'Learn the latest web development techniques and best practices.',
      date: new Date('2025-05-15T10:00:00Z'),
      location: 'Berlin, Germany',
      capacity: 30,
      organizerId: organizer.id,
    },
  });

  const event3 = await prisma.event.upsert({
    where: { id: '3' },
    update: {},
    create: {
      id: '3',
      title: 'Startup Pitch Night',
      description:
        'Meet innovative startups and investors. A great opportunity to network and learn about new ideas.',
      date: new Date('2025-06-20T19:00:00Z'),
      location: 'Berlin, Germany',
      capacity: 50,
      organizerId: organizer.id,
    },
  });

  // Create additional test users for attendances
  const attendee1 = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      email: 'alice@example.com',
      firstName: 'Alice',
      lastName: 'Smith',
      passwordHash: hashedPassword,
      role: 'USER',
    },
  });

  const attendee2 = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      email: 'bob@example.com',
      firstName: 'Bob',
      lastName: 'Johnson',
      passwordHash: hashedPassword,
      role: 'USER',
    },
  });

  const attendee3 = await prisma.user.upsert({
    where: { email: 'carol@example.com' },
    update: {},
    create: {
      email: 'carol@example.com',
      firstName: 'Carol',
      lastName: 'Williams',
      passwordHash: hashedPassword,
      role: 'USER',
    },
  });

  const attendee4 = await prisma.user.upsert({
    where: { email: 'david@example.com' },
    update: {},
    create: {
      email: 'david@example.com',
      firstName: 'David',
      lastName: 'Brown',
      passwordHash: hashedPassword,
      role: 'USER',
    },
  });

  // Create attendances for events
  await prisma.attendance.createMany({
    data: [
      // Event 1: How to Network
      { userId: testUser.id, eventId: event1.id },
      { userId: attendee1.id, eventId: event1.id },
      { userId: attendee2.id, eventId: event1.id },
      // Event 2: Web Development Workshop
      { userId: testUser.id, eventId: event2.id },
      { userId: attendee1.id, eventId: event2.id },
      { userId: attendee3.id, eventId: event2.id },
      { userId: attendee4.id, eventId: event2.id },
      // Event 3: Startup Pitch Night
      { userId: attendee2.id, eventId: event3.id },
      { userId: attendee3.id, eventId: event3.id },
      { userId: attendee4.id, eventId: event3.id },
    ],
    skipDuplicates: true,
  });

  console.log('Test user created:', testUser);
  console.log('Organizer created:', organizer);
  console.log('Mock events created:', event1, event2, event3);
  console.log('Attendees created:', attendee1, attendee2, attendee3, attendee4);
  console.log('Attendances created for all events');
  console.log('Login data:');
  console.log('email: test@example.com');
  console.log('password: 123456');
  console.log('Organizer email: organizer@example.com');
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
