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
// { eager: true, query: '?raw' } imports content directly at build time
const guideFiles = import.meta.glob('../guides/*.md', { eager: true, query: '?raw' })

// Process markdown files into a clean data array
const guides = Object.entries(guideFiles).map(([filepath, fileModule]) => {
  const content = fileModule.default || fileModule
  
  // Extract slug from filename (e.g., "../guides/getting-started.md" -> "getting-started")
  const filename = filepath.split('/').pop().replace('.md', '')
  const slug = filename === 'index' ? 'overview' : filename

  // Extract frontmatter title if available, otherwise generate title from filename
  const titleMatch = content.match(/^---\s*\ntitle:\s*(.*?)\n---/m)
  const title = titleMatch
    ? titleMatch[1].trim()
    : filename.replace(/[-_]/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())

  // Strip frontmatter from raw content for display
  const cleanContent = content.replace(/^---\s*\n[\s\S]*?\n---\s*\n?/, '')

  return { slug, title, content: cleanContent }
})

// Sort guides so "Overview" or "Getting Started" comes first if present
guides.sort((a, b) => {
  if (a.slug === 'overview') return -1
  if (b.slug === 'overview') return 1
  return a.title.localeCompare(b.title)
})

// 2. DYNAMICALLY SCAN ALL API SPECS IN /public/specs/
const specFiles = import.meta.glob('/public/specs/*.yaml', { query: '?url', eager: true })

const apiSpecs = Object.keys(specFiles).map((filepath) => {
  const filename = filepath.split('/').pop().replace('.yaml', '')
  const title = filename.replace(/[-_]/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  return { slug: filename, title, url: `/specs/${filename}.yaml` }
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
        <a href={href} onClick={handleClick} style={{ color: '#6366f1', fontWeight: 600 }}>
          {children}
        </a>
      )
    }
  }

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
      {content}
    </ReactMarkdown>
  )
}

// Dynamic Wrapper for Scalar API Reference Viewer
function ApiReferenceViewer() {
  const { specName } = useParams()
  const specUrl = `/specs/${specName}.yaml`

  return (
    <div style={{ margin: '-40px', height: '100vh' }}>
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
    display: 'block',
    padding: '8px 12px',
    borderRadius: '6px',
    textDecoration: 'none',
    color: isActive ? '#4338ca' : '#374151',
    background: isActive ? '#e0e7ff' : 'transparent',
    fontWeight: isActive ? 'bold' : 'normal',
    marginBottom: '4px'
  })

  const defaultGuideSlug = guides.length > 0 ? guides[0].slug : 'overview'

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* Sidebar Navigation */}
      <aside style={{ width: '260px', borderRight: '1px solid #eee', padding: '20px', background: '#f9f9f9' }}>
        <h3 style={{ marginTop: 0 }}>Guides</h3>
        <nav style={{ marginBottom: '20px' }}>
          {guides.map((guide) => (
            <NavLink key={guide.slug} to={`/guides/${guide.slug}`} style={navStyle}>
              {guide.title}
            </NavLink>
          ))}
        </nav>

        {apiSpecs.length > 0 && (
          <>
            <h3>API References</h3>
            <nav>
              {apiSpecs.map((spec) => (
                <NavLink key={spec.slug} to={`/api-reference/${spec.slug}`} style={navStyle}>
                  {spec.title}
                </NavLink>
              ))}
            </nav>
          </>
        )}
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '40px', maxWidth: '850px' }}>
        <Routes>
          <Route path="/" element={<Navigate to={`/guides/${defaultGuideSlug}`} replace />} />
          
          {/* Dynamically Generate Markdown Routes */}
          {guides.map((guide) => (
            <Route
              key={guide.slug}
              path={`/guides/${guide.slug}`}
              element={<MarkdownGuide content={guide.content} />}
            />
          ))}

          {/* Dynamic Route for Scalar API References */}
          <Route path="/api-reference/:specName" element={<ApiReferenceViewer />} />
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