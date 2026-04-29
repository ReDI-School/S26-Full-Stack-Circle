import prisma from '../libs/prisma.js';

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

  async createUser(data: {
    email: string;
    firstName: string;
    lastName: string;
    passwordHash: string;
  }) {
    return await prisma.user.create({
      data,
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
}
