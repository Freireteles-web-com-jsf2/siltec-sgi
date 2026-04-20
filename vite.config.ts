import { defineConfig as ViteDefineConfig, PluginOption } from 'vite';
import { defineConfig as VitestDefineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import { configDefaults } from 'vitest/config';

// Base Vite configuration
const baseViteConfig = ViteDefineConfig({
  plugins: [react() as PluginOption], // Instancia o plugin do React
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

// Vitest configuration object
const vitestConfig = VitestDefineConfig({
  // Pass Vite's config to Vitest
  vite: {
    ...baseViteConfig, // Mescla a configuração base do Vite
    // Explicitamente adicionar o plugin do React aqui novamente para garantir que seja aplicado no contexto de teste
    plugins: [react() as PluginOption],
  },
  test: {
    ...configDefaults, // Mescla as configurações padrão do Vitest
    environment: 'happy-dom', // Ambiente de teste baseado em DOM
    globals: true, // Torna globais as funções do Vitest (describe, it, etc.)
    setupFiles: ['./vitest.setup.ts'], // Arquivo de setup para Vitest
    alias: { // Resolve aliases para Vitest
      '@': './src',
    },
  },
});

// Exporta a configuração do Vitest. Vitest CLI a reconhecerá.
export default vitestConfig;
