import { defineConfig } from 'vite';
export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'index',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        'react'
      ],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
  },
});
