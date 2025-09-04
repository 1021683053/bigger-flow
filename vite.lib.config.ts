import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: ['src/index.ts', 'src/styles.less'],
      fileName: (format, entryName) => `lib.${format}.js`,
      cssFileName: 'styles',
    },
    outDir: 'lib',
    copyPublicDir: false,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', '@dagrejs/dagre', '@xyflow/react', 'lodash-es', 'classnames' ],
    },
  },
})
