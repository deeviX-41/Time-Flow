import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

type userDto = {
  name: string;
  email: string;
  phone: string;
  salary: number;
};

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
  async createUser(data: userDto): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }
  async updateUser(id: number, data: userDto): Promise<User> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }
  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
