import inquirer from 'inquirer';
import chalk from 'chalk';
import Table from 'cli-table3';
import { UserService } from '../../src/user/user.service';

export async function userCommands(action: string, userService: UserService) {
  switch (action) {
    case 's': {
      const answers = await inquirer.prompt<{
        name: string;
        email: string;
        phone: string;
        salary: number;
      }>([
        { type: 'input', name: 'name', message: 'Nombre del usuario:' },
        { type: 'input', name: 'email', message: 'Email del usuario:' },
        { type: 'input', name: 'phone', message: 'Teléfono del usuario:' },
        { type: 'number', name: 'salary', message: 'Salario del usuario:' },
      ]);

      const user = await userService.createUser({
        name: answers.name,
        email: answers.email,
        phone: answers.phone,
        salary: answers.salary,
      } as any);

      console.log(chalk.greenBright('\nUsuario creado:'));
      console.log(user);
      break;
    }

    case 'l': {
      const users = await userService.getAllUsers();
      if (!users || users.length === 0) {
        console.log(chalk.yellow('\nNo hay usuarios en la base de datos.\n'));
        break;
      }

      const table = new Table({
        head: ['ID', 'Nombre', 'Email', 'Teléfono'],
        colWidths: [6, 25, 30, 20],
      });

      users.forEach((u) => table.push([u.id, u.name, u.email, u.phone]));
      console.log('\n' + table.toString() + '\n');
      break;
    }

    case 'u': {
      const { id } = await inquirer.prompt<{ id: number }>([
        {
          type: 'number',
          name: 'id',
          message: 'ID del usuario a actualizar:',
        },
      ]);

      const existing = await userService.getUserById(id);
      if (!existing) {
        console.log(chalk.redBright('Usuario no encontrado'));
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
          name: 'email',
          message: 'Email:',
          default: existing.email,
        },
        {
          type: 'input',
          name: 'phone',
          message: 'Teléfono:',
          default: existing.phone,
        },
        {
          type: 'number',
          name: 'salary',
          message: 'Salario:',
          default: existing.salary,
        },
      ]);

      const updated = await userService.updateUser(id, data as any);

      console.log(chalk.greenBright('\nUsuario actualizado:'));
      console.log(updated);
      break;
    }

    case 'd': {
      const { id } = await inquirer.prompt<{ id: number }>([
        {
          type: 'number',
          name: 'id',
          message: 'ID del usuario a eliminar:',
        },
      ]);

      const { confirm } = await inquirer.prompt<{ confirm: boolean }>([
        {
          type: 'confirm',
          name: 'confirm',
          message: `¿Eliminar usuario ${id}?`,
          default: false,
        },
      ]);

      if (!confirm) {
        console.log(chalk.yellow('Eliminación cancelada'));
        break;
      }

      await userService.deleteUser(id);
      console.log(chalk.green('Usuario eliminado'));
      break;
    }

    default:
      console.log('Acción no válida para user. Usa s|l|u|d');
  }
}
