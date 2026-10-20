import base from '@lnu/eslint-config'
import jsdoc from '@lnu/eslint-config/jsdoc'
import node from '@lnu/eslint-config/node'

export default [
  ...base,
  ...node,
  ...jsdoc,
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
