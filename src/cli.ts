import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserService } from './user/user.service';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const userService = appContext.get(UserService);

  yargs(hideBin(process.argv))
    .command(
      'list',
      'Listar todos los usuarios',
      () => {},
      async () => {
        const users = await userService.getAllUsers();
        console.table(users);
        await appContext.close();
      },
    )
    .command(
      'get <id>',
      'Obtener un usuario por ID',
      (yargs) =>
        yargs.positional('id', { type: 'number', describe: 'ID del usuario' }),
      async (argv) => {
        const user = await userService.getUserById(argv.id as number);
        console.log(user);
        await appContext.close();
      },
    )
    .command(
      'create <name> <email> <phone>',
      'Crear un nuevo usuario',
      (yargs) => {
        return yargs
          .positional('name', { type: 'string' })
          .positional('email', { type: 'string' })
          .positional('phone', { type: 'string' });
      },
      async (argv) => {
        const user = await userService.createUser({
          name: argv.name as string,
          email: argv.email as string,
          phone: argv.phone as string,
          salary: Number(argv.phone as string),
        });
        console.log('Usuario creado:', user);
        await appContext.close();
      },
    )
    .command(
      'delete <id>',
      'Eliminar un usuario por ID',
      (yargs) => yargs.positional('id', { type: 'number' }),
      async (argv) => {
        const deleted = await userService.deleteUser(argv.id as number);
        console.log('Usuario eliminado:', deleted);
        await appContext.close();
      },
    )
    .command(
      'update <id> [name] [email] [phone]',
      'Actualizar un usuario',
      (yargs) =>
        yargs
          .positional('id', { type: 'number' })
          .option('name', { type: 'string' })
          .option('email', { type: 'string' })
          .option('phone', { type: 'string' }),
      async (argv) => {
        const updated = await userService.updateUser(
          argv.id as number,
          {
            name: argv.name,
            email: argv.email,
            phone: argv.phone,
          } as any,
        );
        console.log('Usuario actualizado:', updated);
        await appContext.close();
      },
    )
    .demandCommand()
    .help()
    .parse();
}

bootstrap();
