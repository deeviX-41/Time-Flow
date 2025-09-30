import inquirer from 'inquirer';
import chalk from 'chalk';
import Table from 'cli-table3';
import { AppointmentService } from '../../src/appointment/appointment.service';

const STATUS_MAP = {
  '1': 'pendiente',
  '2': 'completada',
  '3': 'cancelada',
};
const STATUS_DISPLAY = {
  '1': 'Pendiente',
  '2': 'Completada',
  '3': 'Cancelada',
};

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
          name: 'statusOption',
          message: 'Estado de la cita:',
          choices: [
            { name: STATUS_DISPLAY['1'], value: '1' },
            { name: STATUS_DISPLAY['2'], value: '2' },
            { name: STATUS_DISPLAY['3'], value: '3' },
          ],
          default: '1',
        },
      ]);

      const appointment = await appointmentService.createAppointment({
        date: new Date(answers.date),
        time: answers.time,
        userId: answers.userId,
        customerId: answers.customerId,
        status: STATUS_MAP[answers.statusOption as keyof typeof STATUS_MAP],
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
        head: ['ID', 'Fecha', 'Hora', 'Estado', 'Usuario', 'Cliente'],
        colWidths: [6, 14, 8, 16, 20, 20],
      });

      apps.forEach((a: any) => {
        // Formatear el status con emoji
        let statusDisplay = a.status;
        if (a.status === 'pendiente') statusDisplay = 'Pendiente';
        if (a.status === 'completada') statusDisplay = 'Completada';
        if (a.status === 'cancelada') statusDisplay = 'Cancelada';

        table.push([
          a.id,
          a.date ? new Date(a.date).toLocaleDateString() : a.date,
          a.time,
          statusDisplay,
          a.user ? a.user.name : a.userId,
          a.customer ? a.customer.name : a.customerId,
        ]);
      });
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
        console.log(chalk.redBright('Cita no encontrada'));
        break;
      }

      let currentStatusOption = '1';
      if (existing.status === 'completada') currentStatusOption = '2';
      if (existing.status === 'cancelada') currentStatusOption = '3';

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
          type: 'list',
          name: 'statusOption',
          message: 'Estado de la cita:',
          choices: [
            { name: STATUS_DISPLAY['1'], value: '1' },
            { name: STATUS_DISPLAY['2'], value: '2' },
            { name: STATUS_DISPLAY['3'], value: '3' },
          ],
          default: currentStatusOption,
        },
      ]);

      const updated = await appointmentService.updateAppointment(id, {
        date: data.date ? new Date(data.date) : existing.date,
        time: data.time,
        userId: data.userId,
        customerId: data.customerId,
        status: STATUS_MAP[data.statusOption as keyof typeof STATUS_MAP],
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
