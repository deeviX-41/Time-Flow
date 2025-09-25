import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CustomerModule } from './customer/customer.module';
import { AppointmentModule } from './appointment/appointment.module';

@Module({
  imports: [UserModule, CustomerModule, AppointmentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
