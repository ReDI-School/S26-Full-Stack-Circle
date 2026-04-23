import prisma from '../libs/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserService {
  async getAllUsers() {
    return await prisma.user.findMany();
  }

  async getUserById(id: string) {
    return await prisma.user.findUnique({
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

  async signIn(data: { email: string; password: string }) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new Error('INVALID_CREDENTIALS');
    }

    const isPasswordCorrect = await bcrypt.compare(data.password, user.passwordHash);

    if (!isPasswordCorrect) {
      throw new Error('INVALID_CREDENTIALS');
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET_MISSING');
    }

    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: '10m',
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }
}
