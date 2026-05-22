import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/webhooks.ts'],
  outDir: 'dist',
  target: 'es2020',
  dts: true,
  clean: true,
  format: ['esm', 'cjs'],
  splitting: false,
  sourcemap: true,
  treeshake: true,
});
