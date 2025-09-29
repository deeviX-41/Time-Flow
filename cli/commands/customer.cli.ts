import inquirer from 'inquirer';
import chalk from 'chalk';
import Table from 'cli-table3';
import { CustomerService } from '../../src/customer/customer.service';

export async function customerCommands(
  action: string,
  customerService: CustomerService,
) {
  switch (action) {
    case 's': {
      const answers = await inquirer.prompt<{ name: string; phone: string }>([
        { type: 'input', name: 'name', message: '👤 Nombre del cliente:' },
        { type: 'input', name: 'phone', message: '📱 Teléfono del cliente:' },
      ]);

      const customer = await customerService.createCustomer(answers as any);

      console.log(chalk.greenBright('\nCliente creado:'));
      console.log(customer);
      break;
    }

    case 'l': {
      const customers = await customerService.getAllCustomer();
      if (!customers || customers.length === 0) {
        console.log(chalk.yellow('\nNo hay clientes en la base de datos.\n'));
        break;
      }

      const table = new Table({
        head: ['ID', 'Nombre', 'Teléfono'],
        colWidths: [6, 30, 20],
      });

      customers.forEach((c) => table.push([c.id, c.name, c.phone]));
      console.log('\n' + table.toString() + '\n');
      break;
    }

    case 'u': {
      const { id } = await inquirer.prompt<{ id: number }>([
        {
          type: 'number',
          name: 'id',
          message: 'ID del cliente a actualizar:',
        },
      ]);

      const existing = await customerService.getCustomerById(id);
      if (!existing) {
        console.log(chalk.redBright('Cliente no encontrado'));
        break;
      }

      const data = await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Nombre:',
          default: existing.name,
        },
        {
          type: 'input',
          name: 'phone',
          message: 'Teléfono:',
          default: existing.phone,
        },
      ]);

      const updated = await customerService.updateCustomer(id, data as any);

      console.log(chalk.greenBright('\nCliente actualizado:'));
      console.log(updated);
      break;
    }

    case 'd': {
      const { id } = await inquirer.prompt<{ id: number }>([
        {
          type: 'number',
          name: 'id',
          message: 'ID del cliente a eliminar:',
        },
      ]);

      const { confirm } = await inquirer.prompt<{ confirm: boolean }>([
        {
          type: 'confirm',
          name: 'confirm',
          message: `¿Eliminar cliente ${id}?`,
          default: false,
        },
      ]);

      if (!confirm) {
        console.log(chalk.yellow('Eliminación cancelada'));
        break;
      }

      await customerService.deleteCustomer(id);
      console.log(chalk.green('Cliente eliminado'));
      break;
    }

    default:
      console.log('Acción no válida para customer. Usa s|l|u|d');
  }
}
