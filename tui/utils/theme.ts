// Colores base del sistema
export const COLORS = {
  // Colores primarios
  primary: 'blue',
  primaryLight: 'lightblue',
  secondary: 'cyan',
  secondaryLight: 'lightcyan',

  // Colores de estado
  success: 'green',
  successLight: 'lightgreen',
  danger: 'red',
  dangerLight: 'lightred',
  warning: 'yellow',
  warningLight: 'lightyellow',
  info: 'cyan',

  // Colores neutrales
  text: 'white',
  textMuted: 'gray',
  textDark: 'black',
  bg: 'black',
  bgLight: 'white',

  // Colores para bordes
  border: 'cyan',
  borderActive: 'yellow',
  borderInactive: 'gray',

  // Colores adicionales
  magenta: 'magenta',
  lightmagenta: 'lightmagenta',
} as const;

// Estilos predefinidos para componentes comunes
export const STYLES = {
  // Estilos para el header/título principal
  header: {
    fg: COLORS.text,
    bold: true,
  },

  // Estilos para el footer
  footer: {
    fg: COLORS.text,
  },

  // Estilos para cajas/contenedores
  box: {
    fg: COLORS.text,
    bg: COLORS.bg,
    border: {
      fg: COLORS.border,
    },
  },

  // Estilos para cajas enfocadas/activas
  boxFocused: {
    fg: COLORS.text,
    bg: COLORS.bg,
    border: {
      fg: COLORS.borderActive,
    },
  },

  // Estilos para listas
  list: {
    fg: COLORS.text,
    bg: COLORS.bg,
    selected: {
      fg: COLORS.bg,
      bg: COLORS.secondary,
      bold: true,
    },
    border: {
      fg: COLORS.border,
    },
  },

  // Estilos para tablas
  table: {
    fg: COLORS.text,
    bg: COLORS.bg,
    header: {
      fg: COLORS.text,
      bg: COLORS.primary,
      bold: true,
    },
    cell: {
      fg: COLORS.text,
      selected: {
        fg: COLORS.bg,
        bg: COLORS.secondary,
      },
    },
    border: {
      fg: COLORS.border,
    },
  },

  // Estilos para formularios
  form: {
    label: {
      fg: COLORS.secondary,
      bold: true,
    },
    input: {
      fg: COLORS.text,
      bg: COLORS.bg,
      focus: {
        fg: COLORS.text,
        bg: COLORS.bg,
        border: {
          fg: COLORS.borderActive,
        },
      },
    },
  },

  // Estilos para botones
  button: {
    fg: COLORS.text,
    bg: COLORS.primary,
    focus: {
      fg: COLORS.text,
      bg: COLORS.secondary,
      bold: true,
    },
  },

  // Estilos para mensajes/alertas
  message: {
    success: {
      fg: COLORS.success,
      border: {
        fg: COLORS.success,
      },
    },
    error: {
      fg: COLORS.danger,
      border: {
        fg: COLORS.danger,
      },
    },
    warning: {
      fg: COLORS.warning,
      border: {
        fg: COLORS.warning,
      },
    },
    info: {
      fg: COLORS.info,
      border: {
        fg: COLORS.info,
      },
    },
  },

  // Estilos para diálogos/popups
  dialog: {
    fg: COLORS.text,
    bg: COLORS.bg,
    border: {
      fg: COLORS.warning,
    },
  },
} as const;

// Configuración de bordes
export const BORDERS = {
  line: 'line',
  double: 'double',
  round: 'round',
  bold: 'bold',
  single: 'single',
  doubleSingle: 'double-single',
  singleDouble: 'single-double',
  classic: 'classic',
} as const;

// Símbolos y caracteres especiales útiles
export const SYMBOLS = {
  check: '✓',
  cross: '✗',
  bullet: '•',
  arrow: '→',
  arrowUp: '↑',
  arrowDown: '↓',
  arrowLeft: '←',
  arrowRight: '→',
  line: '─',
  lineVertical: '│',
  corner: '└',
  cornerTop: '┌',
  cornerRight: '┐',
  cornerBottom: '┘',
} as const;

// Configuración de alineación
export const ALIGN = {
  left: 'left',
  center: 'center',
  right: 'right',
} as const;

// Tags de formato para texto (usado con tags: true en blessed)
export const TAGS = {
  // Colores de texto
  textColor: (color: string, text: string) =>
    `{${color}-fg}${text}{/${color}-fg}`,

  // Colores de fondo
  bgColor: (color: string, text: string) =>
    `{${color}-bg}${text}{/${color}-bg}`,

  // Formato de texto
  bold: (text: string) => `{bold}${text}{/bold}`,
  underline: (text: string) => `{underline}${text}{/underline}`,

  // Alineación
  center: (text: string) => `{center}${text}{/center}`,
  left: (text: string) => `{left}${text}{/left}`,
  right: (text: string) => `{right}${text}{/right}`,

  // Combinaciones útiles
  success: (text: string) => `{green-fg}${text}{/green-fg}`,
  error: (text: string) => `{red-fg}${text}{/red-fg}`,
  warning: (text: string) => `{yellow-fg}${text}{/yellow-fg}`,
  info: (text: string) => `{cyan-fg}${text}{/cyan-fg}`,
  muted: (text: string) => `{gray-fg}${text}{/gray-fg}`,
} as const;

export default {
  COLORS,
  STYLES,
  BORDERS,
  SYMBOLS,
  ALIGN,
  TAGS,
};
