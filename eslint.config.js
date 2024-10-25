import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import * as tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import importsPlugin from 'eslint-plugin-import'

export default [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      'vite.config.ts',
      '*.config.js',
      '.next/**',
      'out/**',
      '.cache/**',
      '.eslintcache'
    ]
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        React: true,
        JSX: true,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'react': react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'import': importsPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    rules: {
      ...tseslint.configs['recommended'].rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'quotes': ['warn', 'double'],
      'object-curly-spacing': ['error', 'always'],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' }
      ],

      'import/first': 'error',
      'import/newline-after-import': ['error', { count: 1 }],
      'import/no-duplicates': 'error',
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'],
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type'
          ],
          pathGroups: [
            // React and external libraries in one group
            {
              pattern: '{react,@heroicons/**,@radix-ui/**,@headlessui/**,clsx,class-variance-authority,tailwind-merge,recharts}',
              group: 'external',
              position: 'before'
            },
            // Regular Components (excluding UI components)
            {
              pattern: '@/components/!(ui)/**',
              group: 'internal',
              position: 'before'
            },
            {
              pattern: '@/components/ui/**',
              group: 'internal',
              position: 'after',
              patternOptions: { nocomment: true }
            },
            // API
            {
              pattern: '@/api/**',
              group: 'internal',
              position: 'after'
            },
            // Hooks
            {
              pattern: '@/hooks/**',
              group: 'internal',
              position: 'after'
            },
            // Lib/Utils
            {
              pattern: '@/lib/**',
              group: 'internal',
              position: 'after'
            },
            // Types
            {
              pattern: '@/types/**',
              group: 'type',
              position: 'after'
            }
          ],
          distinctGroup: false,
          pathGroupsExcludedImportTypes: ['type'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          }
        }
      ],
      'import/no-unresolved': 'error',
    },
  },
]
