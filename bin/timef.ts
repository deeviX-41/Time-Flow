#!/usr/bin/env node
import 'dotenv/config';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { UserService } from '../src/user/user.service';
import { CustomerService } from '../src/customer/customer.service';
import { AppointmentService } from '../src/appointment/appointment.service';
import { PrismaService } from '../src/prisma/prisma.service';

import { userCommands } from '../cli/commands/user.cli';
import { customerCommands } from '../cli/commands/customer.cli';
import { appointmentCommands } from '../cli/commands/appointment.cli';

const prisma = new PrismaService();
// Instancias de los servicios
const userService = new UserService(prisma);
const customerService = new CustomerService(prisma);
const appointmentService = new AppointmentService(prisma);

yargs(hideBin(process.argv))
  .scriptName('timef')
  .usage('$0 <command> <action>')

  // Usuarios
  .command(
    'user <action>',
    'Gestión de usuarios (s=create, l=list, u=update, d=delete)',
    (yargs) => {
      return yargs.positional('action', {
        describe: 'Acción a realizar',
        type: 'string',
        choices: ['s', 'l', 'u', 'd'],
      });
    },
    (argv) => userCommands(argv.action as string, userService),
  )

  // Clientes
  .command(
    'customer <action>',
    'Gestión de clientes (s=create, l=list, u=update, d=delete)',
    (yargs) => {
      return yargs.positional('action', {
        describe: 'Acción a realizar',
        type: 'string',
        choices: ['s', 'l', 'u', 'd'],
      });
    },
    (argv) => customerCommands(argv.action as string, customerService),
  )

  // Citas
  .command(
    'appointment <action>',
    'Gestión de citas (s=create, l=list, u=update, d=delete)',
    (yargs) => {
      return yargs.positional('action', {
        describe: 'Acción a realizar',
        type: 'string',
        choices: ['s', 'l', 'u', 'd'],
      });
    },
    (argv) => appointmentCommands(argv.action as string, appointmentService),
  )

  .demandCommand(1, '⚠️ Debes especificar al menos un comando')
  .help()
  .strict()
  .parse();
