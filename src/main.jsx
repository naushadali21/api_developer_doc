import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate
} from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ApiReferenceReact } from '@scalar/api-reference-react'
import '@scalar/api-reference-react/style.css'

// Import raw markdown guides
import indexMd from '../guides/index.md?raw'
import gettingStartedMd from '../guides/getting-started.md?raw'
import authMd from '../guides/authentication.md?raw'
import webhooksMd from '../guides/webhooks.md?raw'

// Custom link component to route markdown links using React Router
function MarkdownGuide({ content }) {
  const navigate = useNavigate()

  const markdownComponents = {
    a: ({ href, children }) => {
      const handleClick = (e) => {
        // Handle internal absolute paths via React Router
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

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* Sidebar Navigation */}
      <aside style={{ width: '260px', borderRight: '1px solid #eee', padding: '20px', background: '#f9f9f9' }}>
        <h3 style={{ marginTop: 0 }}>Guides</h3>
        <nav style={{ marginBottom: '20px' }}>
          <NavLink to="/guides/overview" style={navStyle}>
            Overview
          </NavLink>
          <NavLink to="/guides/getting-started" style={navStyle}>
            Getting Started
          </NavLink>
          <NavLink to="/guides/authentication" style={navStyle}>
            Authentication
          </NavLink>
          <NavLink to="/guides/webhooks" style={navStyle}>
            Webhooks
          </NavLink>
        </nav>

        <h3>API Reference</h3>
        <nav>
          <NavLink to="/api-reference" style={navStyle}>
            REST API Reference
          </NavLink>
        </nav>
      </aside>

      {/* Main View Area */}
      <main style={{ flex: 1, padding: '40px', maxWidth: '850px' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/guides/overview" replace />} />
          <Route path="/guides/overview" element={<MarkdownGuide content={indexMd} />} />
          <Route path="/guides/getting-started" element={<MarkdownGuide content={gettingStartedMd} />} />
          <Route path="/guides/authentication" element={<MarkdownGuide content={authMd} />} />
          <Route path="/guides/webhooks" element={<MarkdownGuide content={webhooksMd} />} />
          <Route
            path="/api-reference"
            element={
              <div style={{ margin: '-40px', height: '100vh' }}>
                <ApiReferenceReact
                  configuration={{
                    spec: { url: '/openapi.yaml' },
                    authentication: { preferredSecurityScheme: 'BearerAuth' }
                  }}
                />
              </div>
            }
          />
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