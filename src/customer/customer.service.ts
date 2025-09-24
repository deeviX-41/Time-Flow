import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async getAllUser(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserById(id: number): Promise<User[]> {
    return this.prisma.user.findMany();
  }
  async createUser(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
