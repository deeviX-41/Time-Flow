import blessed from 'blessed';
import { COLORS, STYLES, TAGS } from '../utils/theme';

export interface MenuOption {
  label: string;
  key: string;
  action: () => void;
}

export function createMainMenu(
  screen: blessed.Widgets.Screen,
  options: MenuOption[],
): blessed.Widgets.ListElement {
  // Crear el box contenedor del menú
  const menuContainer = blessed.box({
    parent: screen,
    top: 'center',
    left: 'center',
    width: '60%',
    height: '70%',
    border: {
      type: 'line',
    },
    style: STYLES.boxFocused,
    label: ' Menu Principal ',
    tags: true,
  });

  // Texto de instrucciones arriba del menú
  const instructions = blessed.box({
    parent: menuContainer,
    top: 0,
    left: 0,
    width: '100%',
    height: 3,
    content: TAGS.center(
      TAGS.muted('Use flechas para navegar, Enter para seleccionar'),
    ),
    tags: true,
  });

  // Formatear las opciones del menú con shortcuts
  const menuItems = options.map((opt) => {
    return `  [${opt.key}] ${opt.label}`;
  });

  // Crear la lista del menú
  const menu = blessed.list({
    parent: menuContainer,
    top: 3,
    left: 1,
    width: '100%-2',
    height: '100%-5',
    items: menuItems,
    keys: true,
    vi: true,
    mouse: true,
    style: STYLES.list,
    tags: true,
  });

  // Footer con información adicional
  const menuFooter = blessed.box({
    parent: menuContainer,
    bottom: 0,
    left: 0,
    width: '100%',
    height: 1,
    content: TAGS.center(TAGS.muted('Presiona [q] para salir')),
    tags: true,
  });

  // Manejar selección con Enter
  menu.on('select', (item, index) => {
    const selectedOption = options[index];
    if (selectedOption && selectedOption.action) {
      selectedOption.action();
    }
  });

  // Manejar teclas shortcuts directas
  options.forEach((opt, index) => {
    screen.key([opt.key, opt.key.toUpperCase()], () => {
      menu.select(index);
      const selectedOption = options[index];
      if (selectedOption && selectedOption.action) {
        selectedOption.action();
      }
    });
  });

  // Enfocar el menú
  menu.focus();

  return menu;
}

// Función helper para mostrar un mensaje temporal
export function showMessage(
  screen: blessed.Widgets.Screen,
  title: string,
  message: string,
  type: 'success' | 'error' | 'warning' | 'info' = 'info',
  duration: number = 2000,
): void {
  const messageStyle = STYLES.message[type];

  const messageBox = blessed.box({
    parent: screen,
    top: 'center',
    left: 'center',
    width: '50%',
    height: '30%',
    border: {
      type: 'line',
    },
    style: messageStyle,
    label: ` ${title} `,
    content: TAGS.center(`\n\n${message}`),
    tags: true,
  });

  screen.render();

  // Cerrar automáticamente después de la duración
  setTimeout(() => {
    messageBox.destroy();
    screen.render();
  }, duration);
}

// Función para mostrar un diálogo de confirmación
export function showConfirmDialog(
  screen: blessed.Widgets.Screen,
  title: string,
  message: string,
  onConfirm: () => void,
  onCancel?: () => void,
): void {
  const dialog = blessed.box({
    parent: screen,
    top: 'center',
    left: 'center',
    width: '50%',
    height: '40%',
    border: {
      type: 'line',
    },
    style: STYLES.dialog,
    label: ` ${title} `,
    tags: true,
  });

  const messageText = blessed.box({
    parent: dialog,
    top: 1,
    left: 1,
    width: '100%-2',
    height: '100%-6',
    content: TAGS.center(`\n${message}`),
    tags: true,
  });

  const buttonsContainer = blessed.box({
    parent: dialog,
    bottom: 1,
    left: 'center',
    width: '80%',
    height: 3,
  });

  // Botón Confirmar
  const confirmButton = blessed.button({
    parent: buttonsContainer,
    left: 2,
    width: '40%',
    height: 3,
    content: TAGS.center('[ Si ]'),
    tags: true,
    style: STYLES.button,
    border: {
      type: 'line',
    },
  });

  // Botón Cancelar
  const cancelButton = blessed.button({
    parent: buttonsContainer,
    right: 2,
    width: '40%',
    height: 3,
    content: TAGS.center('[ No ]'),
    tags: true,
    style: STYLES.button,
    border: {
      type: 'line',
    },
  });

  // Manejar eventos
  confirmButton.on('press', () => {
    dialog.destroy();
    screen.render();
    if (onConfirm) onConfirm();
  });

  cancelButton.on('press', () => {
    dialog.destroy();
    screen.render();
    if (onCancel) onCancel();
  });

  // Shortcuts de teclado
  screen.key(['y', 'Y', 'enter'], () => {
    confirmButton.press();
  });

  screen.key(['n', 'N', 'escape'], () => {
    cancelButton.press();
  });

  // Enfocar el botón de confirmar
  confirmButton.focus();
  screen.render();
}

// Función para limpiar la pantalla (remover todos los elementos excepto header y footer)
export function clearScreen(
  screen: blessed.Widgets.Screen,
  keepElements: blessed.Widgets.Node[] = [],
): void {
  const allChildren = [...screen.children];

  allChildren.forEach((child) => {
    if (!keepElements.includes(child)) {
      child.destroy();
    }
  });

  screen.render();
}
