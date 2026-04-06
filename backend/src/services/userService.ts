// import prisma from '../libs/prisma.js';

// export class UserService {
//   async getAllUsers() {
//     return await prisma.user.findMany();
//   }

//   async getUserById(id: string) {
//     return await prisma.user.findUnique({
//       where: { id },
//     });
//   }

//   async createUser(data: { email: string; name?: string }) {
//     return await prisma.user.create({
//       data,
//     });
//   }

//   async updateUser(id: string, data: { email?: string; name?: string }) {
//     return await prisma.user.update({
//       where: { id },
//       data,
//     });
//   }

//   async deleteUser(id: string) {
//     return await prisma.user.delete({
//       where: { id },
//     });
//   }
// }

import prisma from '../libs/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

type CreateUserData = {
  email: string;
  name?: string;
  password: string;
  role?: string;
};

type UpdateUserData = {
  email?: string;
  name?: string;
};

type SignInData = {
  email: string;
  password: string;
};

export class UserService {
  async getAllUsers() {
    return await prisma.user.findMany();
  }

  async getUserById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  async createUser(data: CreateUserData) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
        role: data.role ?? 'user',
      },
    });
  }

  async updateUser(id: string, data: UpdateUserData) {
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

  async signIn(data: SignInData) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new Error('INVALID_CREDENTIALS');
    }

    const isPasswordCorrect = await bcrypt.compare(data.password, user.password);

    if (!isPasswordCorrect) {
      throw new Error('INVALID_CREDENTIALS');
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET_MISSING');
    }

    const tokenPayload = {
      user: user.name ?? user.email,
      roles: user.role,
      expire: '10 minutes',
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: '10m',
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }
}
