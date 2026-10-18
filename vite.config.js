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
                const targetExport = 'export const defaultPortfolioData ='
                const exportMatch = currentContent.indexOf(targetExport)
                if (exportMatch !== -1) {
                  const prefix = currentContent.substring(0, exportMatch)
                  const newContent = `${prefix}${targetExport} ${JSON.stringify(data, null, 2)};\n`
                  fs.writeFileSync(targetPath, newContent, 'utf8')
                  res.writeHead(200, { 'Content-Type': 'application/json' })
                  res.end(JSON.stringify({ success: true, message: 'Updated defaultPortfolioData in codebase!' }))
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

      server.middlewares.use('/api/save-document', (req, res) => {
        if (req.method === 'POST') {
          let body = ''
          req.on('data', (chunk) => { body += chunk })
          req.on('end', () => {
            try {
              const { filename, base64 } = JSON.parse(body)
              if (!filename || !base64) {
                res.writeHead(400, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ success: false, message: 'Filename and base64 data required' }))
                return
              }
              const publicDir = path.resolve(__dirname, 'public')
              if (!fs.existsSync(publicDir)) {
                fs.mkdirSync(publicDir, { recursive: true })
              }
              const safeName = path.basename(filename).replace(/[^a-zA-Z0-9._-]/g, '_')
              const targetPath = path.resolve(publicDir, safeName)
              const rawData = base64.replace(/^data:[^;]+;base64,/, '')
              fs.writeFileSync(targetPath, Buffer.from(rawData, 'base64'))
              res.writeHead(200, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ success: true, url: `/${safeName}`, filename: safeName }))
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