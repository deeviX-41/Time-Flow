import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Appointment } from '@prisma/client';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  async getAllAppointments(): Promise<Appointment[]> {
    return this.prisma.appointment.findMany({
      include: { user: true, customer: true },
    });
  }

  async getAppointmentById(id: number): Promise<Appointment | null> {
    return this.prisma.appointment.findUnique({
      where: { id },
      include: { user: true, customer: true },
    });
  }

  async createAppointment(data: Appointment): Promise<Appointment> {
    return this.prisma.appointment.create({ data });
  }

  async updateAppointment(id: number, data: Appointment): Promise<Appointment> {
    return this.prisma.appointment.update({
      where: { id },
      data,
    });
  }

  async deleteAppointment(id: number): Promise<Appointment> {
    return this.prisma.appointment.delete({ where: { id } });
  }
}
