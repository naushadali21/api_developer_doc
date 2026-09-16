import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
  useParams
} from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ApiReferenceReact } from '@scalar/api-reference-react'
import '@scalar/api-reference-react/style.css'

// 1. DYNAMICALLY SCAN ALL MARKDOWN FILES IN /guides
const guideFiles = import.meta.glob('../guides/*.md', { eager: true, query: '?raw' })

const guides = Object.entries(guideFiles).map(([filepath, fileModule]) => {
  const content = fileModule.default || fileModule
  const filename = filepath.split('/').pop().replace('.md', '')
  const slug = filename === 'index' ? 'overview' : filename

  const titleMatch = content.match(/^---\s*\ntitle:\s*(.*?)\n---/m)
  const title = titleMatch
    ? titleMatch[1].trim()
    : filename.replace(/[-_]/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())

  const cleanContent = content.replace(/^---\s*\n[\s\S]*?\n---\s*\n?/, '')

  return { slug, title, content: cleanContent }
})

guides.sort((a, b) => {
  if (a.slug === 'overview') return -1
  if (b.slug === 'overview') return 1
  return a.title.localeCompare(b.title)
})

// 2. DYNAMICALLY SCAN ALL API SPECS IN /public/specs/
const specFiles = import.meta.glob('/public/specs/*.yaml', { query: '?url', eager: true })

const apiSpecs = Object.entries(specFiles).map(([filepath, module]) => {
  const rawFilename = filepath.split('/').pop() // e.g., "transfers.yaml" or "01-transfers.yaml"
  const filenameWithoutExt = rawFilename.replace('.yaml', '')

  // Extract clean title and slug without breaking original file mapping
  const orderMatch = filenameWithoutExt.match(/^(\d+)[-_](.*)$/)
  const cleanSlug = orderMatch ? orderMatch[2] : filenameWithoutExt

  const title = cleanSlug
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())

  return {
    slug: cleanSlug,
    title,
    // Store original exact file URL mapped from public directory
    specUrl: `/specs/${rawFilename}`
  }
})

// Markdown link Router Interceptor
function MarkdownGuide({ content }) {
  const navigate = useNavigate()

  const markdownComponents = {
    a: ({ href, children }) => {
      const handleClick = (e) => {
        if (href && href.startsWith('/')) {
          e.preventDefault()
          navigate(href)
        }
      }

      return (
        <a href={href} onClick={handleClick} style={{ color: '#0066cc', fontWeight: 600, textDecoration: 'none' }}>
          {children}
        </a>
      )
    }
  }

  return (
    <div className="markdown-body" style={{ padding: '32px 48px', maxWidth: '880px', margin: '0 auto' }}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  )
}

// Dynamic Wrapper for Scalar API Reference Viewer
function ApiReferenceViewer({ specs }) {
  const { specName } = useParams()
  
  // Find matching spec object using cleanSlug
  const matchedSpec = specs.find((s) => s.slug === specName)
  
  // Fall back to direct name if not found in map
  const specUrl = matchedSpec ? matchedSpec.specUrl : `/specs/${specName}.yaml`

  return (
    <div style={{ height: 'calc(100vh - 56px)', width: '100%' }}>
      <ApiReferenceReact
        key={specName}
        configuration={{
          spec: { url: specUrl },
          authentication: { preferredSecurityScheme: 'BearerAuth' }
        }}
      />
    </div>
  )
}

function Layout() {
  const navStyle = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '6px 12px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: isActive ? '600' : '500',
    color: isActive ? 'var(--scalar-color-1, #1c1e21)' : 'var(--scalar-color-2, #646b79)',
    backgroundColor: isActive ? 'var(--scalar-background-2, #f1f3f5)' : 'transparent',
    transition: 'all 0.15s ease'
  })

  const defaultGuideSlug = guides.length > 0 ? guides[0].slug : 'overview'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Top Header Navigation matching Scalar UI */}
      <header
        style={{
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          borderBottom: '1px solid var(--scalar-border-color, #e5e7eb)',
          backgroundColor: 'var(--scalar-background-1, #ffffff)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          gap: '24px'
        }}
      >
        <div style={{ fontWeight: 700, fontSize: '15px', color: '#1c1e21', paddingRight: '12px' }}>
          Docs
        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
          {/* Guides Links */}
          {guides.map((guide) => (
            <NavLink key={guide.slug} to={`/guides/${guide.slug}`} style={navStyle}>
              {guide.title}
            </NavLink>
          ))}

          {/* Separator Divider */}
          {guides.length > 0 && apiSpecs.length > 0 && (
            <div style={{ width: '1px', height: '18px', backgroundColor: '#e5e7eb', margin: '0 8px' }} />
          )}

          {/* API Specs Links */}
          {apiSpecs.map((spec) => (
            <NavLink key={spec.slug} to={`/api-reference/${spec.slug}`} style={navStyle}>
              {spec.title} API
            </NavLink>
          ))}
        </nav>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <Routes>
          <Route path="/" element={<Navigate to={`/guides/${defaultGuideSlug}`} replace />} />
          
          {guides.map((guide) => (
            <Route
              key={guide.slug}
              path={`/guides/${guide.slug}`}
              element={<MarkdownGuide content={guide.content} />}
            />
          ))}

          <Route path="/api-reference/:specName" element={<ApiReferenceViewer specs={apiSpecs} />} />
        </Routes>
      </main>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </React.StrictMode>
)