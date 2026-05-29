import prisma from '../libs/prisma.js';
import bcrypt from 'bcrypt';

export class UserService {
  async getAllUsers() {
    return await prisma.user.findMany();
  }

  async getUserById(id: string) {
    return await prisma.user.findUnique({
      // https://www.prisma.io/docs/v6/orm/prisma-client/queries/excluding-fields
      omit: {
        passwordHash: true,
      },
      where: { id },
    });
  }

  async createUser(data: { email: string; firstName: string; lastName: string; password: string }) {
    const existingUser = await this.findUserByEmail(data.email);

    if (existingUser) {
      throw new Error('EMAIL_ALREADY_IN_USE');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    return await prisma.user.create({
      omit: {
        passwordHash: true,
      },
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        passwordHash,
        role: 'USER',
      },
    });
  }

  async updateUser(id: string, data: { email?: string; firstName?: string; lastName?: string }) {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: string) {
    return await prisma.user.delete({
      where: { id },
    });
  }

  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }
}
