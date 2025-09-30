# Time-Flow CLI

Sistema de gestion de citas.

## Características

- Gestión de Usuarios (empleados y profesionales)
- Gestión de Clientes
- Gestión de Citas
- Base de datos SQLite local

## Instalación

### Prerrequisitos

- Node.js (v16 o superior)
- npm (incluido con Node.js)

### Pasos

1. **Clonar el repositorio**

```bash
git clone https://github.com/deeviX-41/Time-Flow.git
cd Time-Flow
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

Crear un archivo `.env` en la raíz del proyecto y depues pega el siguiente contenido:

```bash
DATABASE_URL="file:./dev.db"
PORT=3000
```

4. **Configurar la base de datos**

```bash
npx prisma generate
npx prisma migrate deploy
```

## Uso

### Sintaxis general

```bash
npm run cli <entidad> <acción>
```

### Ver ayuda

```bash
npm run cli help
```

## Instalación Global (Opcional)

Si deseas usar el comando `timef` directamente sin `npm run`:

```bash
# Compilar el CLI
npm run build:cli

# Instalar globalmente
npm link

# Usar directamente
timef u s
timef c l
timef a l
```

Para desinstalar:

```bash
npm unlink -g timef
```

## Flujo de Trabajo Recomendado

### Primera vez usando el sistema

1. Crear usuarios (profesionales que atenderán)
2. Crear clientes
3. Crear citas (requiere usuarios y clientes existentes)

### Ejemplo completo

```bash
# Paso 1: Crear un usuario
npm run cli u s
# > Nombre: Juan Pérez
# > Email: juan@ejemplo.com
# > Teléfono: 12345678
# > Salario: 3000

# Paso 2: Crear un cliente
npm run cli c s
# > Nombre: María López
# > Teléfono: 87654321

# Paso 3: Ver IDs de usuarios y clientes
npm run cli u l
npm run cli c l

# Paso 4: Crear una cita
npm run cli a s
# > Fecha: 2025-01-15
# > Hora: 14:30
# > ID del usuario: 1
# > ID del cliente: 1
# > Estado: Pendiente
```

**Errores comunes:**

### Error: "Cannot find module"

````bash
npm install
npx prisma generate

### Error: "Base de datos no encontrada"

```bash
npx prisma generate
````

````

### Resetear la base de datos

```bash
rm prisma/dev.db
npx prisma migrate deploy
````

## Tecnologías

- **NestJS** - Framework backend
- **Prisma** - ORM para base de datos
- **SQLite** - Base de datos local
- **TypeScript** - Lenguaje tipado
- **Yargs** - Parser de comandos
- **Inquirer** - Prompts interactivos
- **Chalk** - Colores en terminal
- **CLI-table3** - Tablas en terminal
