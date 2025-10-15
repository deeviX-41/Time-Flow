#!/usr/bin/env node
import 'dotenv/config';
import blessed from 'blessed';
import { COLORS, STYLES, BORDERS, TAGS } from './utils/theme';

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

// Box central para probar colores
const contentBox = blessed.box({
  top: 3,
  left: 'center',
  width: '90%',
  height: '85%',
  content: buildColorDemoContent(),
  tags: true,
  border: {
    type: BORDERS.line,
  },
  style: STYLES.box,
  scrollable: true,
  alwaysScroll: true,
  scrollbar: {
    ch: ' ',
    style: {
      bg: COLORS.secondary,
    },
  },
  keys: true,
  vi: true,
});

// Footer con información
const footer = blessed.box({
  bottom: 0,
  left: 0,
  width: '100%',
  height: 1,
  content: ' Time-Flow v1.0.0 | [q] Salir | [h] Ayuda | [Flechas] Scroll',
  style: STYLES.footer,
});

// Función para construir el contenido de demostración
function buildColorDemoContent(): string {
  return `
  ${TAGS.center(TAGS.bold('DEMOSTRACION DE COLORES Y ESTILOS'))}

  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ${TAGS.bold('COLORES PRIMARIOS:')}
  
  ${TAGS.textColor('blue', '■ Primary (blue)')}
  ${TAGS.textColor('lightblue', '■ Primary Light (lightblue)')}
  ${TAGS.textColor('cyan', '■ Secondary (cyan)')}
  ${TAGS.textColor('lightcyan', '■ Secondary Light (lightcyan)')}

  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ${TAGS.bold('COLORES DE ESTADO:')}
  
  ${TAGS.success('■ Success (green) - Operacion exitosa')}
  ${TAGS.textColor('lightgreen', '■ Success Light (lightgreen)')}
  ${TAGS.error('■ Error/Danger (red) - Algo salio mal')}
  ${TAGS.textColor('lightred', '■ Danger Light (lightred)')}
  ${TAGS.warning('■ Warning (yellow) - Advertencia')}
  ${TAGS.textColor('lightyellow', '■ Warning Light (lightyellow)')}
  ${TAGS.info('■ Info (cyan) - Informacion')}

  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ${TAGS.bold('COLORES NEUTRALES:')}
  
  ${TAGS.textColor('white', '■ Text (white) - Texto principal')}
  ${TAGS.muted('■ Text Muted (gray) - Texto secundario')}
  ${TAGS.textColor('black', '■ Text Dark (black)')}

  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ${TAGS.bold('COLORES ADICIONALES:')}
  
  ${TAGS.textColor('magenta', '■ Magenta')}
  ${TAGS.textColor('lightmagenta', '■ Light Magenta')}

  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ${TAGS.bold('FORMATOS DE TEXTO:')}
  
  ${TAGS.bold('Texto en negrita')}
  ${TAGS.underline('Texto subrayado')}
  ${TAGS.bold(TAGS.success('Negrita y color combinados'))}
  
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ${TAGS.bold('EJEMPLOS DE USO EN LA APLICACION:')}
  
  ${TAGS.success('✓ Usuario creado exitosamente')}
  ${TAGS.error('✗ Error: No se pudo eliminar el registro')}
  ${TAGS.warning('! Advertencia: Esta accion no se puede deshacer')}
  ${TAGS.info('→ Cargando datos...')}
  ${TAGS.muted('(presione Enter para continuar)')}

  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ${TAGS.bold('BORDES DE TEXTO:')}
  
  ${TAGS.textColor('cyan', '■ Border (cyan) - Bordes normales')}
  ${TAGS.textColor('yellow', '■ Border Active (yellow) - Elemento enfocado')}
  ${TAGS.textColor('gray', '■ Border Inactive (gray) - Elemento deshabilitado')}

  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ${TAGS.bold('COMBINACIONES PARA TABLAS:')}
  
  ${TAGS.bgColor('blue', TAGS.textColor('white', ' ID | Nombre      | Estado    '))}
  ${' 1  | Juan Perez  | '}${TAGS.success('Activo    ')}
  ${' 2  | Ana Garcia  | '}${TAGS.warning('Pendiente ')}
  ${' 3  | Luis Torres | '}${TAGS.error('Inactivo  ')}

  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ${TAGS.muted('Usa las flechas para hacer scroll y ver todo el contenido')}
  ${TAGS.muted('Presiona [q] para salir o [h] para ver ayuda')}
  `;
}

// Agregar elementos a la pantalla
screen.append(header);
screen.append(contentBox);
screen.append(footer);

// Enfocar el box de contenido
contentBox.focus();

// Manejadores de eventos de teclado

// Tecla 'q' para salir
screen.key(['q', 'Q'], () => {
  return process.exit(0);
});

// Ctrl+C para salir
screen.key(['C-c'], () => {
  return process.exit(0);
});

// Tecla 'h' para mostrar ayuda
screen.key(['h', 'H'], () => {
  const helpBox = blessed.message({
    parent: screen,
    top: 'center',
    left: 'center',
    width: '60%',
    height: '60%',
    border: {
      type: BORDERS.line,
    },
    style: STYLES.dialog,
    tags: true,
  });

  helpBox.display(
    `${TAGS.center(TAGS.bold(TAGS.warning('AYUDA')))}\n\n` +
      `${TAGS.info('Navegacion:')}\n` +
      `  ↑/↓/j/k - Hacer scroll\n` +
      `  Enter   - Confirmar/Seleccionar\n` +
      `  Esc     - Volver\n` +
      `  q       - Salir\n\n` +
      `${TAGS.info('Atajos de teclado:')}\n` +
      `  h       - Mostrar esta ayuda\n` +
      `  r       - Refrescar pantalla\n` +
      `  t       - Cambiar tema de colores\n\n` +
      `${TAGS.muted('Presiona Esc o Enter para cerrar...')}`,
    0,
    () => {
      screen.render();
    },
  );
});

// Tecla 'r' para refrescar pantalla
screen.key(['r', 'R'], () => {
  screen.render();
});

// Tecla 't' para mostrar un mensaje de ejemplo con estilos
screen.key(['t', 'T'], () => {
  const testBox = blessed.message({
    parent: screen,
    top: 'center',
    left: 'center',
    width: '50%',
    height: '40%',
    border: {
      type: BORDERS.line as any,
    },
    style: STYLES.message.success,
    tags: true,
  });

  testBox.display(
    `${TAGS.center(TAGS.bold('PRUEBA DE ESTILOS'))}\n\n` +
      `${TAGS.success('Operacion exitosa!')}\n` +
      `${TAGS.error('Error en la operacion')}\n` +
      `${TAGS.warning('Advertencia importante')}\n` +
      `${TAGS.info('Informacion relevante')}\n\n` +
      `${TAGS.muted('Presiona Enter para cerrar')}`,
    0,
    () => {
      screen.render();
    },
  );
});

// Renderizar la pantalla inicial
screen.render();
