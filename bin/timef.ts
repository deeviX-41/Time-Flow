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
    ['user <action>', 'u <action>'],
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
    ['customer <action>', 'c <action>'],
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
    ['appointment <action>', 'a <action>'],
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

  .demandCommand(1, 'Debes especificar al menos un comando')
  .help('help')
  .alias('h', 'help')
  .epilog(
    `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
           TIME-FLOW CLI - Gestor de Citas
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GUÍA RÁPIDA:
  Los comandos siguen el patrón: timef <entidad> <acción>
  
  Entidades:
    u  →  usuarios (user)
    c  →  clientes (customer)  
    a  →  citas (appointment)
  
  Acciones:
    s  →  crear/guardar (save)
    l  →  listar (list)
    u  →  actualizar (update)
    d  →  eliminar (delete)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 EJEMPLOS CON USUARIOS:
  timef u s       Crear un nuevo usuario
  timef u l       Ver todos los usuarios
  timef u u       Actualizar un usuario existente
  timef u d       Eliminar un usuario

 EJEMPLOS CON CLIENTES:
  timef c s       Crear un nuevo cliente
  timef c l       Ver todos los clientes
  timef c u       Actualizar un cliente existente
  timef c d       Eliminar un cliente

 EJEMPLOS CON CITAS:
  timef a s       Crear una nueva cita
  timef a l       Ver todas las citas
  timef a u       Actualizar una cita existente
  timef a d       Eliminar una cita
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 CONSEJOS:
  • Puedes usar la forma corta (timef u s) o larga (timef user s)
  • Los datos se guardan en una base de datos SQLite local
  • Asegúrate de crear usuarios y clientes antes de crear citas
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 Más información:
   Visita: https://github.com/deeviX-41/Time-Flow
`,
  )
  .strict()
  .parse();
