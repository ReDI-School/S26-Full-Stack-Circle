import prisma from '../libs/prisma.js';
import bcrypt from 'bcrypt';
import { UserDTO } from '../dto/user.dto.js';

type CreateUserData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

type UpdateUserData = {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
};

type UpdateUserDbData = {
  email?: string;
  firstName?: string;
  lastName?: string;
  passwordHash?: string;
};

export class UserService {
  async getAllUsers() {
    return await prisma.user.findMany({ omit: { passwordHash: true } });
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

  async createUser(data: CreateUserData) {
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

  async updateUser(id: string, data: UpdateUserData) {
    const updateData: UpdateUserDbData = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    };

    if (data.password) {
      updateData.passwordHash = await bcrypt.hash(data.password, 10);
    }

    const user = await prisma.user.update({
      omit: { passwordHash: true },
      where: { id },
      data: updateData,
    });
    return new UserDTO(user);
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
