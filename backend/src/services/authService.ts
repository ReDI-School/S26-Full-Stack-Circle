import prisma from '../libs/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export class AuthService {
  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('INVALID_CREDENTIALS');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordCorrect) {
      throw new Error('INVALID_CREDENTIALS');
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET_MISSING');
    }

    const tokenPayload = {
      userId: user.id,
      role: user.role,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: '10m',
    });

    return token;
  }

  async register(email: string, firstName: string, lastName: string, password: string) {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error('EMAIL_ALREADY_IN_USE');
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    return await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        passwordHash,
      },
    });
  }
}
