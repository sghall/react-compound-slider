import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

const external = id => !id.startsWith('.') && !path.isAbsolute(id);
const isWatch = process.env.ROLLUP_WATCH;

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const output = isWatch
  ? [
      {
        file: 'dist/index.js',
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
      },
    ]
  : [
      {
        file: 'dist/rcs.cjs.development.js',
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
      },
      {
        file: 'dist/rcs.esm.js',
        format: 'esm',
        exports: 'named',
        sourcemap: true,
      },
    ];

export default [
  {
    input: 'src/index.ts',
    output,
    external,
    plugins: [
      resolve({ extensions }),
      babel({
        exclude: 'node_modules/**',
        extensions,
      }),
    ],
  },
  isWatch
    ? null
    : {
        input: 'src/index.ts',
        output: {
          file: 'dist/rcs.cjs.production.min.js',
          format: 'cjs',
          exports: 'named',
          sourcemap: true,
        },
        external,
        plugins: [
          resolve({ extensions }),
          babel({
            exclude: 'node_modules/**',
            extensions,
          }),
          terser({
            output: { comments: false },
            compress: {
              keep_infinity: true,
              pure_getters: true,
              passes: 10,
            },
            ecma: 5,
            toplevel: true,
            warnings: true,
          }),
        ],
      },
].filter(Boolean);
