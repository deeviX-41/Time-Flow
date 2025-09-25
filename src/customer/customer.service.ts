import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Customer } from '@prisma/client';

type customerDto = {
  name: string;
  phone: string;
};
@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async getAllCustomer(): Promise<Customer[]> {
    return this.prisma.customer.findMany();
  }

  async getCustomerById(id: number): Promise<Customer | null> {
    return this.prisma.customer.findUnique({
      where: {
        id,
      },
    });
  }
  async createCustomer(data: customerDto): Promise<Customer> {
    return this.prisma.customer.create({
      data,
    });
  }
  async updateCustomer(id: number, data: customerDto): Promise<Customer> {
    return this.prisma.customer.update({
      where: {
        id,
      },
      data,
    });
  }
  async deleteCustomer(id: number): Promise<Customer> {
    return this.prisma.customer.delete({
      where: {
        id,
      },
    });
  }
}
