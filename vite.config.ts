// Vitestの型を追加する
/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // デフォルトのnode環境ではDOMを再現できない
    environment: "jsdom",
  },
})
