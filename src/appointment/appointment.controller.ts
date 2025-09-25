import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import type { Appointment } from '@prisma/client';
import { AppointmentService } from './appointment.service';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly AppointmentService: AppointmentService) {}

  @Get()
  async getAllAppointments() {
    return this.AppointmentService.getAllAppointments();
  }

  @Post()
  async createAppointment(@Body() data: Appointment) {
    return this.AppointmentService.createAppointment(data);
  }

  @Get(':id')
  async getAppointmentById(@Param('id') id: string) {
    return this.AppointmentService.getAppointmentById(Number(id));
  }

  @Delete(':id')
  async deleteAppointment(@Param('id') id: string) {
    return this.AppointmentService.deleteAppointment(Number(id));
  }

  @Put(':id')
  async updateAppointment(@Param('id') id: string, @Body() data: Appointment) {
    return this.AppointmentService.updateAppointment(Number(id), data);
  }
}
