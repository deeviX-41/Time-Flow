import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import type { Customer } from '@prisma/client';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private readonly CustomerService: CustomerService) {}

  @Get()
  async getAllUsers() {
    return this.CustomerService.getAllCustomer();
  }

  @Post()
  async createUser(@Body() data: Customer) {
    return this.CustomerService.createCustomer(data);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.CustomerService.getCustomerById(Number(id));
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.CustomerService.deleteCustomer(Number(id));
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() data: Customer) {
    return this.CustomerService.updateCustomer(Number(id), data);
  }
}
