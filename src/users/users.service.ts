// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(
    email: string,
    name: string,
    password: string,
    verifyToken?: string,
  ): Promise<User> {
    return this.prisma.user.create({
      data: {
        email,
        name,
        password,
        verifyToken: verifyToken || null,
      },
    });
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
