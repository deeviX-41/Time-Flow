import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [AppointmentController],
  providers: [AppointmentService],
  imports: [PrismaModule],
})
export class AppointmentModule {}
