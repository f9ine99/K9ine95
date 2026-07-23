export const themeState = $state({
  currentTheme: 'Macchiato',
  currentAccentColor: '#f0ede5'
});

export const themePalettes: Record<string, Record<string, string>> = {
  Mocha: {
    '--bg-color': '#11111b',
    '--card-bg': '#1e1e2e',
    '--card-bg-elevated': '#181825',
    '--text-primary': '#cdd6f4',
    '--text-muted': '#7f849c',
    '--accent-orange': '#fab387',
    '--accent-blue': '#89b4fa',
    '--accent-purple': '#cba6f7',
    '--selection-bg': '#313244',
    '--scrollbar-thumb': '#585b70',
    '--nav-bg': 'rgba(17, 17, 27, 0.08)',
    '--card-hover': 'rgba(255, 255, 255, 0.03)'
  },
  Macchiato: {
    '--bg-color': '#1e2030',
    '--card-bg': '#24273a',
    '--card-bg-elevated': '#1e2030',
    '--text-primary': '#cad3f5',
    '--text-muted': '#8087a2',
    '--accent-orange': '#f0ede5',
    '--accent-blue': '#8aadf4',
    '--accent-purple': '#c6a0f6',
    '--selection-bg': '#363a4f',
    '--scrollbar-thumb': '#5b6078',
    '--nav-bg': 'rgba(30, 32, 48, 0.08)',
    '--card-hover': 'rgba(255, 255, 255, 0.03)'
  },
  Frappe: {
    '--bg-color': '#232634',
    '--card-bg': '#303446',
    '--card-bg-elevated': '#292c3c',
    '--text-primary': '#c6d0f5',
    '--text-muted': '#838ba7',
    '--accent-orange': '#ef9f76',
    '--accent-blue': '#8caaee',
    '--accent-purple': '#ca9ee6',
    '--selection-bg': '#414559',
    '--scrollbar-thumb': '#626880',
    '--nav-bg': 'rgba(35, 38, 52, 0.08)',
    '--card-hover': 'rgba(255, 255, 255, 0.03)'
  },
  Latte: {
    '--bg-color': '#eff1f5',
    '--card-bg': '#e6e9ef',
    '--card-bg-elevated': '#dce0e8',
    '--text-primary': '#2e3150',
    '--text-muted': '#5c607a',
    '--heading-color': '#1e2030',
    '--accent-orange': '#fe640b',
    '--accent-blue': '#1e66f5',
    '--accent-purple': '#8839ef',
    '--selection-bg': '#ccd0da',
    '--scrollbar-thumb': '#9ca0b0',
    '--nav-bg': 'rgba(239, 241, 245, 0.85)',
    '--card-hover': 'rgba(0, 0, 0, 0.04)',
    '--subtle-bg': 'rgba(0, 0, 0, 0.04)',
    '--border-subtle': 'rgba(0, 0, 0, 0.08)',
    '--border-medium': 'rgba(0, 0, 0, 0.14)',
    '--overlay-light': 'rgba(0, 0, 0, 0.03)',
    '--overlay-medium': 'rgba(0, 0, 0, 0.05)',
    '--shadow-medium': 'rgba(0, 0, 0, 0.12)',
    '--tag-bg': 'rgba(0, 0, 0, 0.06)'
  },
  White: {
    '--bg-color': '#ffffff',
    '--card-bg': '#f4f4f5',
    '--card-bg-elevated': '#ebebed',
    '--text-primary': '#111113',
    '--text-muted': '#3f3f46',
    '--heading-color': '#09090b',
    '--accent-orange': '#c2410c',
    '--accent-blue': '#1d4ed8',
    '--accent-purple': '#6d28d9',
    '--selection-bg': '#e4e4e7',
    '--scrollbar-thumb': '#71717a',
    '--nav-bg': 'rgba(255, 255, 255, 0.88)',
    '--card-hover': 'rgba(0, 0, 0, 0.045)',
    '--subtle-bg': 'rgba(0, 0, 0, 0.04)',
    '--border-subtle': 'rgba(0, 0, 0, 0.09)',
    '--border-medium': 'rgba(0, 0, 0, 0.16)',
    '--overlay-light': 'rgba(0, 0, 0, 0.03)',
    '--overlay-medium': 'rgba(0, 0, 0, 0.06)',
    '--shadow-medium': 'rgba(0, 0, 0, 0.1)',
    '--tag-bg': 'rgba(0, 0, 0, 0.06)'
  },
  'Rose Pine': {
    '--bg-color': '#191724',
    '--card-bg': '#1f1d2e',
    '--card-bg-elevated': '#26233a',
    '--text-primary': '#e0def4',
    '--text-muted': '#908caa',
    '--accent-orange': '#ebbcba',
    '--accent-blue': '#9ccfd8',
    '--accent-purple': '#c4a7e7',
    '--selection-bg': '#2e2738',
    '--scrollbar-thumb': '#6e6a86',
    '--nav-bg': 'rgba(25, 23, 36, 0.82)',
    '--card-hover': 'rgba(224, 222, 244, 0.05)'
  },
  Nord: {
    '--bg-color': '#2e3440',
    '--card-bg': '#3b4252',
    '--card-bg-elevated': '#434c5e',
    '--text-primary': '#eceff4',
    '--text-muted': '#7b88a1',
    '--accent-orange': '#d08770',
    '--accent-blue': '#88c0d0',
    '--accent-purple': '#b48ead',
    '--selection-bg': '#4c566a',
    '--scrollbar-thumb': '#5a6578',
    '--nav-bg': 'rgba(46, 52, 64, 0.82)',
    '--card-hover': 'rgba(236, 239, 244, 0.05)'
  },
  Dracula: {
    '--bg-color': '#282a36',
    '--card-bg': '#44475a',
    '--card-bg-elevated': '#21222c',
    '--text-primary': '#f8f8f2',
    '--text-muted': '#6272a4',
    '--accent-orange': '#ffb86c',
    '--accent-blue': '#8be9fd',
    '--accent-purple': '#bd93f9',
    '--selection-bg': '#44475a',
    '--scrollbar-thumb': '#6272a4',
    '--nav-bg': 'rgba(40, 42, 54, 0.82)',
    '--card-hover': 'rgba(248, 248, 242, 0.05)'
  },
  'Tokyo Night': {
    '--bg-color': '#1a1b26',
    '--card-bg': '#24283b',
    '--card-bg-elevated': '#1f2335',
    '--text-primary': '#c0caf5',
    '--text-muted': '#565f89',
    '--accent-orange': '#7aa2f7',
    '--accent-blue': '#7dcfff',
    '--accent-purple': '#bb9af7',
    '--selection-bg': '#2c3459',
    '--scrollbar-thumb': '#565f89',
    '--nav-bg': 'rgba(26, 27, 38, 0.82)',
    '--card-hover': 'rgba(192, 202, 245, 0.06)'
  }
};

export const lightThemeList = ['White', 'Latte'] as const;

export function isLightTheme(themeName: string) {
  return (lightThemeList as readonly string[]).includes(themeName);
}

export const darkThemes = [
  'Macchiato',
  'Mocha',
  'Frappe',
  'Rose Pine',
  'Nord',
  'Dracula',
  'Tokyo Night'
] as const;

export const themes = [...darkThemes, ...lightThemeList];

export const colors = [
  '#f0ede5',
  '#cba6f7',
  '#fab387',
  '#f9e2af',
  '#a6e3a1',
  '#94e2d5',
  '#89dceb',
  '#74c7ec',
  '#89b4fa',
  '#b4befe',
  '#ed8796',
  '#ee99a0',
  '#f5bde6',
  '#f4dbd6'
];

function updateThemeColorMeta(color: string) {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', color);
}

function syncLightClass(themeName: string) {
  // Keep `.Latte` for existing light-mode CSS hooks across the site.
  document.documentElement.classList.toggle('Latte', isLightTheme(themeName));
}

/** Shared dark UI tokens so light-mode overrides never leak after switching back. */
const darkUiTokens: Record<string, string> = {
  '--heading-color': '#fff',
  '--subtle-bg': 'rgba(255, 255, 255, 0.03)',
  '--border-subtle': 'rgba(255, 255, 255, 0.05)',
  '--border-medium': 'rgba(255, 255, 255, 0.08)',
  '--overlay-light': 'rgba(255, 255, 255, 0.04)',
  '--overlay-medium': 'rgba(255, 255, 255, 0.06)',
  '--shadow-medium': 'rgba(0, 0, 0, 0.2)',
  '--tag-bg': 'rgba(0, 0, 0, 0.2)'
};

export function applyTheme(themeName: string, persist = true) {
  themeState.currentTheme = themeName;
  const palette = themePalettes[themeName];
  if (palette) {
    themeState.currentAccentColor = palette['--accent-orange'];
    const tokens = isLightTheme(themeName) ? palette : { ...darkUiTokens, ...palette };
    Object.entries(tokens).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
    syncLightClass(themeName);
    updateThemeColorMeta(palette['--bg-color']);
  } else {
    document.documentElement.classList.remove('Latte');
  }
  if (persist) {
    savePreferences();
  }
}

export function setAccentColor(color: string, persist = true) {
  themeState.currentAccentColor = color;
  document.documentElement.style.setProperty('--accent-orange', color);
  if (persist) {
    savePreferences();
  }
}

function savePreferences() {
  try {
    localStorage.setItem(
      'theme-prefs',
      JSON.stringify({
        theme: themeState.currentTheme,
        accent: themeState.currentAccentColor
      })
    );
  } catch {
    /* ignore */
  }
}

export function loadSavedTheme() {
  try {
    const saved = localStorage.getItem('theme-prefs');
    if (!saved) {
      applyTheme(themeState.currentTheme, false);
      return;
    }

    const prefs = JSON.parse(saved) as {
      theme?: string;
      accent?: string;
    };

    if (prefs.theme && themePalettes[prefs.theme]) {
      applyTheme(prefs.theme, false);
    } else {
      applyTheme(themeState.currentTheme, false);
    }

    if (prefs.accent) {
      setAccentColor(prefs.accent, false);
    }
  } catch {
    applyTheme(themeState.currentTheme, false);
  }
}
