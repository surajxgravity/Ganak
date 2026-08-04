import { useEffect, useMemo, useState, type MouseEvent } from 'react'
import './styles/app.css'
import { UnitConverter } from './features/unit-converter/UnitConverter'
import { availableTools, categories, findToolByPath } from './tools/registry'

export default function GanakApp() {
  const [pathname, setPathname] = useState(() => window.location.pathname)
  const [query, setQuery] = useState('')
  const activeTool = findToolByPath(pathname)
  const matchingTools = useMemo(
    () =>
      availableTools.filter((tool) =>
        `${tool.name} ${tool.description} ${tool.keywords.join(' ')}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query],
  )

  useEffect(() => {
    const syncRoute = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', syncRoute)
    return () => window.removeEventListener('popstate', syncRoute)
  }, [])

  function navigate(event: MouseEvent<HTMLAnchorElement>, path: string) {
    event.preventDefault()
    window.history.pushState({}, '', path)
    setPathname(path)
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <a className="brand" href="/" onClick={(event) => navigate(event, '/')}>
          Ganak<span>·</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="/" onClick={(event) => navigate(event, '/')}>
            Tools
          </a>
          <a href="#about">About</a>
        </nav>
      </header>
      <main id="main-content">
        {activeTool?.id === 'unit-converter' ? (
          <UnitConverter />
        ) : (
          <>
            <section className="hero">
              <p className="eyebrow">Universal calculation engine</p>
              <h1>Precise tools for everyday thinking.</h1>
              <p className="hero-copy">
                Ganak is an open-source home for reliable calculations, conversions, and technical
                utilities—built to grow without losing clarity.
              </p>
              <label className="search-field">
                <span>Search available tools</span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Try “length” or “units”"
                />
              </label>
            </section>
            <section className="tool-section" aria-labelledby="tools-heading">
              <div className="section-heading">
                <p className="eyebrow">Tool registry</p>
                <h2 id="tools-heading">Start with a dependable foundation.</h2>
              </div>
              <div className="tool-grid">
                {matchingTools.map((tool) => (
                  <article className="tool-card" key={tool.id}>
                    <p className="tool-category">{categories[tool.category]}</p>
                    <h3>{tool.name}</h3>
                    <p>{tool.description}</p>
                    <a href={tool.path} onClick={(event) => navigate(event, tool.path)}>
                      Open tool <span aria-hidden="true">→</span>
                    </a>
                  </article>
                ))}
                {matchingTools.length === 0 && (
                  <p className="empty-state">No available tools match “{query}”.</p>
                )}
              </div>
            </section>
          </>
        )}
      </main>
      <footer id="about">
        <p>
          <strong>Ganak</strong> — a modular, privacy-respecting universal calculation engine.
        </p>
      </footer>
    </div>
  )
}
