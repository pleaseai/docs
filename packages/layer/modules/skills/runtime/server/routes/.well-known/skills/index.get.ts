import { parse as parseYaml } from 'yaml'

interface SkillCatalogItem {
  name: string
  description: string
  path: string
}

const SKILL_NAME_REGEX = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
const MAX_NAME_LENGTH = 64

function parseFrontmatter(content: string): { name?: string, description?: string } | null {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match?.[1]) {
    return null
  }
  try {
    const parsed: unknown = parseYaml(match[1])
    if (!parsed || typeof parsed !== 'object') {
      return null
    }
    const obj = parsed as Record<string, unknown>
    return {
      name: typeof obj.name === 'string' ? obj.name : undefined,
      description: typeof obj.description === 'string' ? obj.description : undefined,
    }
  }
  catch {
    return null
  }
}

function isValidSkillName(name: string): boolean {
  if (name.length === 0 || name.length > MAX_NAME_LENGTH) return false
  if (!SKILL_NAME_REGEX.test(name)) return false
  if (name.includes('--')) return false
  return true
}

async function readAssetAsString(storage: ReturnType<typeof useStorage>, key: string): Promise<string | null> {
  // Use getItemRaw so files are returned as their raw bytes/string instead
  // of being deserialized by destr (which would parse JSON files).
  const raw = await storage.getItemRaw<unknown>(key)
  if (raw === null || raw === undefined) return null
  if (typeof raw === 'string') return raw
  if (raw instanceof Uint8Array) return new TextDecoder('utf-8').decode(raw)
  if (typeof Buffer !== 'undefined' && Buffer.isBuffer(raw)) return raw.toString('utf-8')
  return null
}

export default defineEventHandler(async (event) => {
  const storage = useStorage('assets:skills')
  const keys = await storage.getKeys()

  // Storage keys use ':' as path separator (e.g. "create-docs:SKILL.md").
  // Only top-level SKILL.md files map to skills — drop nested matches.
  const skillMdKeys = keys.filter((k) => {
    const segments = k.split(':')
    return segments.length === 2 && segments[1] === 'SKILL.md'
  })

  const catalog: SkillCatalogItem[] = []

  for (const key of skillMdKeys) {
    const dirName = key.split(':')[0]
    if (!dirName) continue

    const raw = await readAssetAsString(storage, key)
    if (raw === null) continue

    const frontmatter = parseFrontmatter(raw)
    if (!frontmatter?.description) {
      console.warn(`[skills] Skipping skill "${dirName}": missing description in SKILL.md frontmatter`)
      continue
    }

    const name = frontmatter.name || dirName
    if (!isValidSkillName(name)) {
      console.warn(`[skills] Skipping skill "${dirName}": name "${name}" does not match the Agent Skills naming spec`)
      continue
    }
    if (name !== dirName) {
      console.warn(`[skills] Skipping skill "${dirName}": frontmatter name "${name}" does not match directory name`)
      continue
    }

    catalog.push({
      name,
      description: frontmatter.description,
      path: `/.well-known/skills/${name}/SKILL.md`,
    })
  }

  catalog.sort((a, b) => a.name.localeCompare(b.name))

  setResponseHeader(event, 'content-type', 'application/json; charset=utf-8')
  setResponseHeader(event, 'cache-control', 'public, max-age=3600')

  return { skills: { catalog } }
})
