import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vitePrerenderPlugin } from 'vite-prerender-plugin'
import ProjectData from './src/ProjectData.jsx'

const projectRoutes = ProjectData.map(
  (p) => `/project/${encodeURIComponent(p.title.replace(/\s+/g, '-').toLowerCase())}`
)

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    ...vitePrerenderPlugin({
      renderTarget: '#root',
      additionalPrerenderRoutes: [
        '/projects',
        '/contact',
        '/past-projects',
        ...projectRoutes,
      ],
    }),
  ],
})
