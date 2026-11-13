// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RootLayout from './components/layout/RootLayout'

// Pages — lazy-loaded for performance
import Home       from './pages/Home'
import About      from './pages/About'
import Experience from './pages/Experience'
import Portfolio  from './pages/Portfolio'
import Media      from './pages/Media'
import Contact    from './pages/Contact'

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 pt-28 px-4 text-center">
      <div className="font-heading font-bold text-white/10 text-[120px] leading-none select-none">404</div>
      <h1 className="font-heading font-bold text-white text-4xl -mt-10">Page Not Found</h1>
      <p className="font-body text-white/60 text-base">The page you're looking for doesn't exist.</p>
      <a href="/" className="btn-primary">Go Home</a>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index          element={<Home />}       />
          <Route path="about"       element={<About />}      />
          <Route path="experience"  element={<Experience />} />
          <Route path="portfolio"   element={<Portfolio />}  />
          <Route path="portfolio/:id" element={<Portfolio />} />
          <Route path="media"       element={<Media />}      />
          <Route path="contact"     element={<Contact />}    />
          <Route path="*"           element={<NotFound />}   />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
