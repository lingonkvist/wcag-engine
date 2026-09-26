import config from '@lnu/eslint-config'
import prettier from 'eslint-config-prettier'

export default [
  ...config,
  prettier,
  {
    settings: {
      jsdoc: {
        ignorePrivate: true,
      },
    },
    rules: {
      'jsdoc/require-jsdoc': [
        'warn',
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
          },
          publicOnly: true,
        },
      ],
    },
  },
]
