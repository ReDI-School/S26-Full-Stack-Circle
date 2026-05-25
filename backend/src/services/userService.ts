import prisma from '../libs/prisma.js';
import bcrypt from 'bcrypt';
import { UserDTO } from '../dto/user.dto.js';

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
    password: string;
    role?: 'USER' | 'ADMIN';
  }) {
    const passwordHash = await bcrypt.hash(data.password, 10);

    return await prisma.user.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        passwordHash,
        role: data.role ?? 'USER',
      },
    });
  }

  async updateUser(id: string, data: { email?: string; firstName?: string; lastName?: string }) {
    const user = await prisma.user.update({
      where: { id },
      data,
    });
    return new UserDTO(user);
  }

  async deleteUser(id: string) {
    return await prisma.user.delete({
      where: { id },
    });
  }
}
