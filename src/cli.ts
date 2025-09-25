import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import inquirer from 'inquirer';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from '../src/user/user.service';

// Inicializamos Prisma y UserService
const prisma = new PrismaService();
const userService = new UserService(prisma);

yargs(hideBin(process.argv))
  .scriptName('timef')
  .command(
    ['s u', 'save-user'],
    'Guardar un nuevo usuario',
    () => {},
    async () => {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: '👤 Nombre del usuario:',
        },
        {
          type: 'input',
          name: 'email',
          message: '📧 Email del usuario:',
        },
        {
          type: 'input',
          name: 'phone',
          message: '📱 Teléfono del usuario:',
        },
        {
          type: 'number',
          name: 'salary',
          message: '💰 Salario del usuario:',
        },
      ]);

      const user = await userService.createUser({
        name: answers.name as string,
        email: answers.email as string,
        phone: answers.phone as string,
        salary: answers.salary as number,
      });

      console.log('✅ Usuario creado:');
      console.log(user);
    },
  )
  .demandCommand(1, 'Debes especificar un comando')
  .help()
  .parse();
