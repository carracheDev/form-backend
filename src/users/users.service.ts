// src/users/users.service.ts
import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(
    email: string,
    name: string,
    password: string,
    verifyToken: string,
  ): Promise<User> {
    try {
      return await this.prisma.user.create({
        data: {
          email,
          name,
          password,
          verifyToken: verifyToken || null,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `Un utilisateur avec l'email ${email} existe déjà.`,
          );
        }
      }
      throw error;
    }
  }

  async findByVerifyToken(token: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { verifyToken: token },
    });
  }

  async markEmailAsVerified(id: number): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: { emailVerified: true, verifyToken: null },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }
}
