import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function portfolioDataSyncPlugin() {
  return {
    name: 'portfolio-data-sync',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Prevent all browsers from ever serving old or stale assets during development
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        next();
      });

      server.middlewares.use('/api/save-portfolio-data', (req, res) => {
        if (req.method === 'POST') {
          let body = ''
          req.on('data', (chunk) => { body += chunk })
          req.on('end', () => {
            try {
              const data = JSON.parse(body)
              const targetPath = path.resolve(__dirname, 'src/data/portfolioData.js')
              if (fs.existsSync(targetPath)) {
                const currentContent = fs.readFileSync(targetPath, 'utf8')
                const exportMatch = currentContent.indexOf('export const PORTFOLIO_BUILD_VERSION')
                const fallbackMatch = exportMatch !== -1 ? exportMatch : currentContent.indexOf('export const defaultPortfolioData =')
                if (fallbackMatch !== -1) {
                  const importsAndAssets = currentContent.substring(0, fallbackMatch)
                  const newVersion = `v-${Date.now()}`
                  data.version = newVersion
                  const newContent = `${importsAndAssets}export const PORTFOLIO_BUILD_VERSION = "${newVersion}";\n\nexport const defaultPortfolioData = ${JSON.stringify(data, null, 2)};\n`
                  fs.writeFileSync(targetPath, newContent, 'utf8')
                  res.writeHead(200, { 'Content-Type': 'application/json' })
                  res.end(JSON.stringify({ success: true, message: 'Updated portfolioData.js in codebase!' }))
                  return
                }
              }
              res.writeHead(400, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ success: false, message: 'Could not locate target in portfolioData.js' }))
            } catch (err) {
              res.writeHead(500, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ success: false, error: err.message }))
            }
          })
        } else {
          res.writeHead(405, { 'Content-Type': 'text/plain' })
          res.end('Method Not Allowed')
        }
      })
    }
  }
}

export default defineConfig({
  define: {
    __PORTFOLIO_BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  plugins: [react(), portfolioDataSyncPlugin()],
  server: {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
    hmr: {
      overlay: false,
    },
  },
})