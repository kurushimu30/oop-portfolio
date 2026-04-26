'use client'

import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// --- 🔦 CYAN CURSOR LIGHT ---
function ContactCursorLight() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { stiffness: 150, damping: 25 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 250) 
      mouseY.set(e.clientY - 250)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <motion.div
      style={{ x, y }}
      className="fixed top-0 left-0 w-[500px] h-[500px] bg-cyan-500/15 blur-[120px] rounded-full pointer-events-none z-0"
    />
  )
}

// --- ⌨️ TYPING EFFECT (Now supports custom colors) ---
function Typewriter({ words, colorClass = "text-cyan-400" }: { words: string[], colorClass?: string }) {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [reverse, setReverse] = useState(false)

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000)
      return
    }
    if (subIndex === 0 && reverse) {
      setReverse(false)
      setIndex((prev) => (prev + 1) % words.length)
      return
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1))
    }, reverse ? 75 : 150)
    return () => clearTimeout(timeout)
  }, [subIndex, index, reverse, words])

  return (
    <span className={`font-mono ${colorClass}`}>
      &#123;{words[index].substring(0, subIndex)}
      <span className="animate-pulse">|</span>&#125;
    </span>
  )
}

/* ─── Founder Data Array ───────────────── */
const contactInfo = [
  { label: 'Full Name',  value: 'Mel Carl A. Chacon', href: null },
  { label: 'Role',       value: 'Founder & CEO @ ARK', href: null },
  { label: 'Email',      value: 'melcarl.chacon@gmail.com', href: 'mailto:melcarl.chacon@gmail.com' },
  { label: 'LinkedIn',   value: 'in/melcarl-chacon', href: 'https://www.linkedin.com/in/melcarl-chacon/' },
  { label: 'GitHub',     value: 'github.com/kurushimu30', href: 'https://github.com/kurushimu30' },
  { label: 'Background', value: 'C# / Unity Game Development', href: null },
]

export default function ContactPage() {
  return (
    <main className="min-h-screen text-white selection:bg-cyan-500/30 overflow-x-hidden">
      <ContactCursorLight />
      <div className="fixed inset-0 grid-pattern opacity-[0.1] pointer-events-none -z-10" />

      {/* ── HEADER ── */}
      <section className="relative overflow-hidden py-32 px-4 sm:px-6 border-b border-white/5 z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto">
          <p className="font-mono text-xs tracking-widest uppercase text-cyan-400 mb-3">&gt; Network</p>
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Contact <Typewriter words={["Information", "Links", "Network"]} colorClass="text-cyan-400" />
          </h1>
          <p className="text-[#8b92a8] text-lg max-w-2xl leading-relaxed">
            Professional profiles, portfolio details, and direct communication lines for Mel Carl A. Chacon.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* ── LEFT COLUMN: FOUNDER INFO & TERMINAL ── */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* The Contact Info Grid */}
            <div>
              {/* Custom Animated Sub-Header matching your screenshot */}
              <div className="mb-6">
                <p className="font-mono text-xs text-indigo-400 uppercase tracking-widest mb-2">Profile</p>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Professional <Typewriter words={["Details", "Data", "Identity"]} colorClass="text-indigo-400" />
                </h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {contactInfo.map((item) => (
                  item.href ? (
                    /* Clickable Link Version */
                    <a 
                      key={item.label} 
                      href={item.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="glass-card rounded-2xl p-6 border border-white/5 hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-mono text-xs text-[#8b92a8] uppercase tracking-wider">{item.label}</p>
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-cyan-500/50 group-hover:text-cyan-400 transition-colors">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                      <p className="text-white font-medium leading-snug group-hover:text-cyan-300 transition-colors">
                        {item.value}
                      </p>
                    </a>
                  ) : (
                    /* Static Text Version */
                    <div key={item.label} className="glass-card rounded-2xl p-6 border border-white/5">
                      <p className="font-mono text-xs text-[#8b92a8] uppercase tracking-wider mb-2">{item.label}</p>
                      <p className="text-white font-medium leading-snug">
                        {item.value}
                      </p>
                    </div>
                  )
                ))}
              </div>
            </div>

            {/* Terminal Contact Form */}
            <div className="glass-card rounded-2xl overflow-hidden border border-white/5 mt-10">
              <div className="px-6 py-4 bg-[#0d1117] border-b border-white/5 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="font-mono text-xs text-[#8b92a8]">establish_connection.exe</span>
              </div>
              
              <div className="p-8">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-mono text-xs text-cyan-400">const name =</label>
                      <input 
                        type="text" 
                        placeholder='"Your Name"'
                        className="w-full bg-[#0f172a]/50 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors font-mono placeholder:text-[#4a5568]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-mono text-xs text-cyan-400">const email =</label>
                      <input 
                        type="email" 
                        placeholder='"your@email.com"'
                        className="w-full bg-[#0f172a]/50 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors font-mono placeholder:text-[#4a5568]"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-cyan-400">const message =</label>
                    <textarea 
                      rows={4}
                      placeholder='"How can we collaborate?"'
                      className="w-full bg-[#0f172a]/50 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors font-mono placeholder:text-[#4a5568] resize-none"
                    />
                  </div>

                  <button className="w-full sm:w-auto px-8 py-3 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-sm font-bold rounded-lg hover:bg-cyan-500/20 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all flex items-center justify-center gap-2 group">
                    System.out.send()
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="group-hover:translate-x-1 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: SIDEBAR ── */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Links */}
            <div className="glass-card rounded-2xl p-6 border border-white/5">
              <p className="font-mono text-xs text-[#8b92a8] uppercase tracking-wider mb-4">Quick Nav</p>
              <nav className="space-y-2">
                {[
                  { href: '/',         label: 'Home',        tag: 'index' },
                  { href: '/midterm',  label: 'Midterm',     tag: 'phase-01' },
                  { href: '/final',    label: 'Final',       tag: 'phase-02' },
                  { href: '/contact',  label: 'Contact',     tag: 'current' },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <span className="text-sm text-[#8b92a8] group-hover:text-white transition-colors">{link.label}</span>
                    <span className="font-mono text-xs text-[#4a5568] group-hover:text-cyan-500/50 transition-colors">{link.tag}</span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Academic Context (Exactly matching the reference image) */}
            <div className="glass-card rounded-2xl p-7 border border-white/5 bg-[#0d1117]">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#0a2333] flex items-center justify-center text-cyan-400">
                  {/* Academic Cap Icon */}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                  </svg>
                </div>
                <p className="font-mono text-sm font-bold text-cyan-400 uppercase tracking-widest">Portfolio Submission</p>
              </div>
              <p className="text-sm text-[#8b92a8] leading-relaxed mb-6">
                This digital infrastructure was engineered to fulfill the Midterm requirements for Object-Oriented Programming (Java) at the Polytechnic University of the Philippines (BSIT 2-1).
              </p>
              
              <div className="space-y-3 mt-4 border-t border-white/5 pt-5">
                {[
                  { label: 'Content Completeness', pts: 20 },
                  { label: 'OOP Application', pts: 20 },
                  { label: 'Code Presentation', pts: 15 },
                  { label: 'Explanation & Reflection', pts: 15 },
                  { label: 'Design & Layout', pts: 10 },
                  { label: 'Navigation & Functionality', pts: 10 },
                  { label: 'Creativity & Effort', pts: 10 },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-cyan-400" />
                      <span className="text-[13px] font-medium text-[#8b92a8]">{item.label}</span>
                    </div>
                    <span className="font-mono text-[13px] font-bold text-cyan-400">{item.pts}pts</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="py-12 text-center opacity-40 border-t border-white/5">
        <p className="text-[10px] font-mono tracking-[0.4em] uppercase">
          &copy; 2026 Mel Carl A. Chacon · Founder @ ARK · BSIT 2-1
        </p>
      </footer>
    </main>
  )
}