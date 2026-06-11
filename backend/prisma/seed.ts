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
  const users = [
    {
      email: 'barts@example.com',
      firstName: 'Bart',
      lastName: 'Simpson',
      password: '123456',
      role: 'USER' as const,
    },
    {
      email: 'patricks@example.com',
      firstName: 'Patrick',
      lastName: 'Star',
      password: '123456',
      role: 'USER' as const,
    },
    {
      email: 'lisas@example.com',
      firstName: 'Lisa',
      lastName: 'Simpson',
      password: 'lisa123',
      role: 'USER' as const,
    },
    {
      email: 'jackson@example.com',
      firstName: 'Michael',
      lastName: 'Jackson',
      password: 'michael123',
      role: 'USER' as const,
    },
  ];

  const createdUsers = [];

  for (const user of users) {
    const passwordHash = await bcrypt.hash(user.password, 10);

    const createdUser = await prisma.user.upsert({
      where: { email: user.email },
      update: {
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      create: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        passwordHash,
        role: user.role,
      },
    });

    createdUsers.push(createdUser);
  }

  console.log(
    'Users upserted:',
    createdUsers.map((u) => `${u.firstName} ${u.lastName} ${u.email}`)
  );

  const events = [
    {
      id: 'c1d8e3f6-4b72-4a95-7d01-9e2f4c6b8a3d',
      title: 'Demo day',
      description: 'Meeting for everyone to demonstrate projects',
      date: new Date('2026-05-17T10:00:00.000Z'),
      location: 'Hamburg',
      capacity: 50,
      organizerId: createdUsers[1].id,
    },
    {
      id: 'c2b8e3f6-4a72-4105-7d01-9e2f4c6b8a3d',
      title: 'AI Webinar',
      description: 'Online meeting to talk about modern AI-features',
      date: new Date('2026-05-25T15:00:00.000Z'),
      location: 'Germany',
      capacity: 60,
      organizerId: createdUsers[0].id,
    },
    {
      id: '1010e3f6-4172-4105-7d01-9e2f4c6b8a3d',
      title: 'Job Search Webinar',
      description: 'Online meeting to talk about job oportunities in Germany',
      date: new Date('2026-05-20T16:00:00.000Z'),
      location: 'Germany',
      capacity: 60,
      organizerId: createdUsers[0].id,
    },
  ];

  const createdEvents = [];

  for (const event of events) {
    const createdEvent = await prisma.event.upsert({
      where: { id: event.id },
      update: {
        title: event.title,
        description: event.description,
        date: event.date,
        location: event.location,
        capacity: event.capacity,
      },
      create: {
        id: event.id,
        title: event.title,
        description: event.description,
        date: event.date,
        location: event.location,
        capacity: event.capacity,
        organizerId: event.organizerId,
      },
    });
    createdEvents.push(createdEvent);
  }
  console.log(
    'Events added:',
    createdEvents.map((e) => e.title)
  );

  const attendances = [
    {
      id: 'abcdf2a9-8c31-4b67-ae54-2f7d9c1e3b6a',
      userId: createdUsers[2].id,
      eventId: createdEvents[0].id,
    },
    {
      id: 'abbcc2a9-8c31-4b67-ae54-2f7d9c1e3b6a',
      userId: createdUsers[1].id,
      eventId: createdEvents[0].id,
    },
    {
      id: 'aaacc2a9-8c31-4b67-ae54-2f7d9c1e3b6a',
      userId: createdUsers[0].id,
      eventId: createdEvents[1].id,
    },
  ];

  const createdAttendances = [];

  for (const attendance of attendances) {
    const createdAttendance = await prisma.attendance.upsert({
      where: {
        userId_eventId: {
          userId: attendance.userId,
          eventId: attendance.eventId,
        },
      },
      update: {},
      create: {
        id: attendance.id,
        userId: attendance.userId,
        eventId: attendance.eventId,
      },
    });

    createdAttendances.push(createdAttendance);
  }

  console.log('Attendances added:', createdAttendances.length);
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
