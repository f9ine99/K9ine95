import js from '@eslint/js';
import ts from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';
import globals from 'globals';
import svelteConfig from './svelte.config.js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs['flat/recommended'],
  prettier,
  ...svelte.configs['flat/prettier'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        __COMMIT_HASH__: 'readonly'
      }
    }
  },
  {
    files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
        extraFileExtensions: ['.svelte'],
        svelteConfig
      }
    }
  },
  {
    rules: {
      // External links and simple hrefs don't need SvelteKit's resolve().
      'svelte/no-navigation-without-resolve': 'off',
      // All {@html} usage goes through sanitizeRichText (unit-tested) or our own JSON-LD.
      'svelte/no-at-html-tags': 'off'
    }
  },
  {
    ignores: ['.svelte-kit/', 'build/', '.vercel/', 'node_modules/', 'static/']
  }
];
