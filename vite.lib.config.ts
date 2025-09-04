import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import path from 'path' 

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), dts({
    rollupTypes: true, 
    tsconfigPath: path.resolve(__dirname, 'tsconfig.app.json'),
    outDir: 'lib/types'
  })],
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
