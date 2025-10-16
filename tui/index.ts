#!/usr/bin/env node
import 'dotenv/config';
import blessed from 'blessed';
import { STYLES } from './utils/theme';
import {
  createMainMenu,
  showMessage,
  showConfirmDialog,
} from './screens/main-menu';

// Crear la pantalla principal
const screen = blessed.screen({
  smartCSR: true,
  title: 'Time-Flow TUI',
  fullUnicode: true,
});

// Header con estilo del theme
const header = blessed.box({
  top: 0,
  left: 'center',
  width: '100%',
  height: 3,
  content: '{center}{bold}TIME-FLOW - Gestor de Citas{/bold}{/center}',
  tags: true,
  style: STYLES.header,
});

// Footer con información
const footer = blessed.box({
  bottom: 0,
  left: 0,
  width: '100%',
  height: 1,
  content: ' Time-Flow v1.0.0 | [q] Salir | Navegacion: Flechas + Enter',
  style: STYLES.footer,
});

// Agregar header y footer a la pantalla
screen.append(header);
screen.append(footer);

// Funciones placeholder para cada opción del menú
function openUsersScreen() {
  showMessage(
    screen,
    'Usuarios',
    'Pantalla de usuarios - Proximamente',
    'info',
    2000,
  );
}

function openCustomersScreen() {
  showMessage(
    screen,
    'Clientes',
    'Pantalla de clientes - Proximamente',
    'info',
    2000,
  );
}

function openAppointmentsScreen() {
  showMessage(
    screen,
    'Citas',
    'Pantalla de citas - Proximamente',
    'info',
    2000,
  );
}

function exitApplication() {
  showConfirmDialog(
    screen,
    'Confirmar Salida',
    'Estas seguro que deseas salir de la aplicacion?',
    () => {
      process.exit(0);
    },
    () => {
      // Si cancela, no hacer nada (el diálogo se cierra automáticamente)
      screen.render();
    },
  );
}

// Definir las opciones del menú
const menuOptions = [
  {
    label: 'Gestionar Usuarios',
    key: 'u',
    action: openUsersScreen,
  },
  {
    label: 'Gestionar Clientes',
    key: 'c',
    action: openCustomersScreen,
  },
  {
    label: 'Gestionar Citas',
    key: 'a',
    action: openAppointmentsScreen,
  },
  {
    label: 'Salir',
    key: 'q',
    action: exitApplication,
  },
];

// Crear el menú principal
const mainMenu = createMainMenu(screen, menuOptions);

// Manejadores globales de teclado

// Ctrl+C para salir
screen.key(['C-c'], () => {
  return process.exit(0);
});

// Tecla 'q' para salir con confirmación
screen.key(['q', 'Q'], () => {
  exitApplication();
});

// Tecla 'r' para refrescar pantalla
screen.key(['r', 'R'], () => {
  screen.render();
});

// Renderizar la pantalla inicial
screen.render();
