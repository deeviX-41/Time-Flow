import inquirer from 'inquirer';
import chalk from 'chalk';
import Table from 'cli-table3';
import { AppointmentService } from '../../src/appointment/appointment.service';

export async function appointmentCommands(
  action: string,
  appointmentService: AppointmentService,
) {
  switch (action) {
    case 's': {
      const answers = await inquirer.prompt([
        { type: 'input', name: 'date', message: 'Fecha (YYYY-MM-DD):' },
        { type: 'input', name: 'time', message: 'Hora (HH:MM):' },
        {
          type: 'number',
          name: 'userId',
          message: 'ID del usuario responsable:',
        },
        { type: 'number', name: 'customerId', message: 'ID del cliente:' },
        {
          type: 'input',
          name: 'status',
          message: 'Estado (pendiente|confirmada|cancelada):',
          default: 'pendiente',
        },
      ]);

      const appointment = await appointmentService.createAppointment({
        date: new Date(answers.date),
        time: answers.time,
        userId: answers.userId,
        customerId: answers.customerId,
        status: answers.status,
      } as any);

      console.log(chalk.greenBright('\nAppointment creada:'));
      console.log(appointment);
      break;
    }

    case 'l': {
      const apps = await appointmentService.getAllAppointments();
      if (!apps || apps.length === 0) {
        console.log(
          chalk.yellow('\nNo hay appointments en la base de datos.\n'),
        );
        break;
      }

      const table = new Table({
        head: ['ID', 'Fecha', 'Hora', 'Estado', 'User', 'Customer'],
        colWidths: [6, 14, 8, 16, 20, 20],
      });

      apps.forEach((a: any) =>
        table.push([
          a.id,
          a.date ? new Date(a.date).toLocaleDateString() : a.date,
          a.time,
          a.status,
          a.user ? a.user.name : a.userId,
          a.customer ? a.customer.name : a.customerId,
        ]),
      );

      console.log('\n' + table.toString() + '\n');
      break;
    }

    case 'u': {
      const { id } = await inquirer.prompt<{ id: number }>([
        {
          type: 'number',
          name: 'id',
          message: 'ID de la appointment a actualizar:',
        },
      ]);

      const existing = await appointmentService.getAppointmentById(id);
      if (!existing) {
        console.log(chalk.redBright('Appointment no encontrada'));
        break;
      }

      const data = await inquirer.prompt([
        {
          type: 'input',
          name: 'date',
          message: 'Fecha (YYYY-MM-DD):',
          default: existing.date
            ? new Date(existing.date).toISOString().slice(0, 10)
            : undefined,
        },
        {
          type: 'input',
          name: 'time',
          message: 'Hora (HH:MM):',
          default: existing.time,
        },
        {
          type: 'number',
          name: 'userId',
          message: 'ID usuario:',
          default: existing.userId,
        },
        {
          type: 'number',
          name: 'customerId',
          message: 'ID cliente:',
          default: existing.customerId,
        },
        {
          type: 'input',
          name: 'status',
          message: 'Estado:',
          default: existing.status ?? 'pendiente',
        },
      ]);

      const updated = await appointmentService.updateAppointment(id, {
        date: data.date ? new Date(data.date) : existing.date,
        time: data.time,
        userId: data.userId,
        customerId: data.customerId,
        status: data.status,
      } as any);

      console.log(chalk.greenBright('\nAppointment actualizada:'));
      console.log(updated);
      break;
    }

    case 'd': {
      const { id } = await inquirer.prompt<{ id: number }>([
        {
          type: 'number',
          name: 'id',
          message: 'ID de la appointment a eliminar:',
        },
      ]);

      const { confirm } = await inquirer.prompt<{ confirm: boolean }>([
        {
          type: 'confirm',
          name: 'confirm',
          message: `¿Eliminar appointment ${id}?`,
          default: false,
        },
      ]);

      if (!confirm) {
        console.log(chalk.yellow('Eliminación cancelada'));
        break;
      }

      await appointmentService.deleteAppointment(id);
      console.log(chalk.green('Appointment eliminada'));
      break;
    }

    default:
      console.log('Acción no válida para appointment. Usa s|l|u|d');
  }
}
