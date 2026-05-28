const CONTENT_TYPES: Record<string, string> = {
  '.md': 'text/markdown; charset=utf-8',
  '.markdown': 'text/markdown; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.yaml': 'application/yaml; charset=utf-8',
  '.yml': 'application/yaml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.py': 'text/plain; charset=utf-8',
  '.sh': 'text/plain; charset=utf-8',
  '.bash': 'text/plain; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.cjs': 'text/javascript; charset=utf-8',
  '.ts': 'text/plain; charset=utf-8',
  '.tsx': 'text/plain; charset=utf-8',
  '.jsx': 'text/plain; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.toml': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
}

function getContentType(path: string): string {
  // Only consider the basename so a path like `dir.x/file` doesn't pick up
  // an extension from a parent directory.
  const slash = path.lastIndexOf('/')
  const basename = slash === -1 ? path : path.slice(slash + 1)
  const dot = basename.lastIndexOf('.')
  if (dot === -1) return 'application/octet-stream'
  const ext = basename.slice(dot).toLowerCase()
  return CONTENT_TYPES[ext] || 'application/octet-stream'
}

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)
  const prefix = '/.well-known/skills/'
  const idx = url.pathname.indexOf(prefix)

  if (idx === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Not Found' })
  }

  let filePath: string
  try {
    filePath = decodeURIComponent(url.pathname.slice(idx + prefix.length))
  }
  catch {
    throw createError({ statusCode: 400, statusMessage: 'Bad Request' })
  }

  // The index.json route is served by a dedicated handler — this one should
  // never see it, but guard anyway.
  if (!filePath || filePath === 'index.json') {
    throw createError({ statusCode: 404, statusMessage: 'Not Found' })
  }

  // Block path traversal and dotfile access.
  const segments = filePath.split('/')
  if (segments.some(seg => seg === '' || seg === '..' || seg === '.' || seg.startsWith('.'))) {
    throw createError({ statusCode: 400, statusMessage: 'Bad Request' })
  }

  const storage = useStorage('assets:skills')

  // Use getItemRaw so JSON/YAML files are returned as their raw bytes/string
  // instead of being deserialized by destr.
  const raw = await storage.getItemRaw<unknown>(filePath)

  if (raw === null || raw === undefined) {
    throw createError({ statusCode: 404, statusMessage: 'Not Found' })
  }

  let content: string
  if (typeof raw === 'string') {
    content = raw
  }
  else if (raw instanceof Uint8Array) {
    content = new TextDecoder('utf-8').decode(raw)
  }
  else if (typeof Buffer !== 'undefined' && Buffer.isBuffer(raw)) {
    content = raw.toString('utf-8')
  }
  else {
    throw createError({ statusCode: 404, statusMessage: 'Not Found' })
  }

  setResponseHeader(event, 'content-type', getContentType(filePath))
  setResponseHeader(event, 'cache-control', 'public, max-age=3600')

  return content
})
