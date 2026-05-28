/**
 * Returns the agent skills catalog from `runtimeConfig.skills.catalog`,
 * which the module builds at startup. This avoids re-scanning storage and
 * re-parsing YAML frontmatter on every request.
 */
export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const catalog = (config.skills?.catalog ?? [])
    .map(skill => ({
      name: skill.name,
      description: skill.description,
      path: `/.well-known/skills/${skill.name}/SKILL.md`,
    }))
    .sort((a, b) => a.name.localeCompare(b.name))

  setResponseHeader(event, 'content-type', 'application/json; charset=utf-8')
  setResponseHeader(event, 'cache-control', 'public, max-age=3600')

  return { skills: { catalog } }
})
