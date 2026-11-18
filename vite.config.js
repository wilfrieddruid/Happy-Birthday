import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    // Les plugins React et Tailwind sont tous deux nécessaires, même si
    // Tailwind n'est pas utilisé activement – ne les supprimez pas
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ vers le dossier src
      '@': path.resolve(__dirname, './src'),
    },
  },

  // Types de fichiers pris en charge pour les imports bruts. N'ajoutez jamais .css, .tsx ou .ts ici.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
