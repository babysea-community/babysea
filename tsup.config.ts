import { defineConfig } from 'tsup';
import { version as typescriptVersion } from 'typescript';

const typescriptMajor = Number.parseInt(typescriptVersion, 10);
const dts =
  Number.isFinite(typescriptMajor) && typescriptMajor >= 6
    ? { compilerOptions: { ignoreDeprecations: '6.0' } }
    : true;

export default defineConfig({
  entry: ['src/index.ts', 'src/webhooks.ts'],
  outDir: 'dist',
  target: 'es2020',
  dts,
  clean: true,
  format: ['esm', 'cjs'],
  splitting: false,
  sourcemap: true,
  treeshake: true,
});
