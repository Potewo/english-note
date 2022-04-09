import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { join } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      onwarn: (warning, handler) => {
        if (warning.code == "a11y-missing-attribute") return
        handler(warning)
      }
    })
  ],
  resolve: {
    dedupe: ["svelte", "svelte/transition", "svelte/internal"],
    extensions: [".svelte", ".ts"],
    alias: [
      {find: "lib", replacement: join(__dirname, "src/lib/")},
      {find: "routes", replacement: join(__dirname, "src/routes/")},
      {find: "@utils", replacement: join(__dirname, "src/utils/")},
    ]
  }
})
