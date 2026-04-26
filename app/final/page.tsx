'use client'

import SectionHeader from '@/components/SectionHeader'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// --- 🔦 PURPLE CURSOR LIGHT ---
function FinalCursorLight() {
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
      className="fixed top-0 left-0 w-[500px] h-[500px] bg-purple-500/15 blur-[120px] rounded-full pointer-events-none z-0"
    />
  )
}

// --- ⌨️ TYPING EFFECT (Purple Version) ---
function Typewriter({ words }: { words: string[] }) {
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
    <span className="font-mono text-purple-400">
      &#123;{words[index].substring(0, subIndex)}
      <span className="animate-pulse">|</span>&#125;
    </span>
  )
}

/* ─── Data Arrays ───────────────── */
const upcomingTopics = [
  { label: 'Classes & Objects',    icon: '⬡', desc: 'Defining blueprints and instantiating real objects in memory.' },
  { label: 'Encapsulation',        icon: '🔒', desc: 'Access modifiers, getters/setters, and data hiding principles.' },
  { label: 'Inheritance',          icon: '⇣',  desc: 'Extending classes, method overriding, and the super keyword.' },
  { label: 'Polymorphism',         icon: '⬡', desc: 'Method overloading, overriding, and dynamic dispatch.' },
  { label: 'Abstraction',          icon: '◈',  desc: 'Abstract classes and interfaces for contract-based design.' },
  { label: 'Exception Handling',   icon: '⚡', desc: 'try-catch-finally, custom exceptions, and robust programs.' },
]

export default function FinalPage() {
  return (
    <main className="min-h-screen text-white selection:bg-purple-500/30 overflow-x-hidden">
      <FinalCursorLight />
      <div className="fixed inset-0 grid-pattern opacity-[0.1] pointer-events-none -z-10" />

      {/* ── HEADER ── */}
      <section className="relative overflow-hidden py-32 px-4 sm:px-6 border-b border-white/5 z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto">
          <p className="font-mono text-xs tracking-widest uppercase text-purple-400 mb-3">&gt; Phase 02</p>
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Final <Typewriter words={["Outputs", "Projects", "Implementations"]} />
          </h1>
          <p className="text-[#8b92a8] text-lg max-w-xl leading-relaxed">
            This section will be updated with Final exam outputs, complex system architecture activities, and technical reflections upon completion of the course&apos;s second phase.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">

        {/* ── COMING SOON BANNER ── */}
        <div className="glass-card rounded-2xl border border-purple-500/30 bg-[#0f172a]/80 p-8 sm:p-12 mb-20 text-center shadow-[0_0_30px_rgba(168,85,247,0.1)]">
          {/* Laser Scanning Animation */}
          <div className="relative overflow-hidden w-20 h-20 mx-auto mb-6 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
            <motion.div 
              animate={{ y: ["-100%", "200%", "-100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 h-4 bg-gradient-to-b from-transparent via-purple-500/40 to-transparent"
            />
            <span className="text-3xl relative z-10">🚧</span>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4">Under Development</h2>
          <p className="text-[#8b92a8] max-w-xl mx-auto text-sm leading-relaxed mb-8">
            The Final phase will shift focus from foundational syntax to structural design. Expect full class hierarchies, interface-based contracts, and a capstone application showcasing all four pillars of Object-Oriented Programming.
          </p>
          <Link
            href="/midterm"
            className="inline-flex items-center gap-2 text-sm font-bold font-mono text-emerald-400 hover:text-emerald-300 transition-all border border-emerald-500/30 bg-emerald-500/10 px-6 py-3 rounded-xl hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]"
          >
            ← Review Phase 01: Midterm
          </Link>
        </div>

        {/* ── UPCOMING TOPICS ── */}
        <div className="mb-12">
          <p className="font-mono text-xs text-purple-400 uppercase tracking-widest mb-2">Curriculum Preview</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Upcoming <Typewriter words={["Topics", "Concepts", "Systems"]} />
          </h2>
          <p className="text-[#8b92a8] mt-4 max-w-2xl">Core OOP architectures that will be demonstrated and reflected on in the Final phase.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {upcomingTopics.map((topic) => (
            <div
              key={topic.label}
              className="glass-card rounded-2xl p-8 border border-white/5 hover:border-purple-500/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 text-purple-400 font-mono text-xl group-hover:bg-purple-500/20 transition-colors">
                {topic.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{topic.label}</h3>
              <p className="text-[#8b92a8] text-sm leading-relaxed">{topic.desc}</p>
            </div>
          ))}
        </div>

        {/* ── OOP PILLARS ── */}
        <div className="pt-12 border-t border-white/5">
          <div className="mb-12 text-center">
            <p className="font-mono text-xs text-purple-400 uppercase tracking-widest mb-2">Core Architecture</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              The Four <Typewriter words={["Pillars", "Foundations", "Principles"]} />
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Encapsulation', color: 'indigo',  desc: 'Data hiding through access control and strict boundaries.' },
              { label: 'Inheritance',   color: 'purple',  desc: 'Reusing logic and establishing hierarchical relationships.' },
              { label: 'Polymorphism',  color: 'emerald', desc: 'Designing systems with many forms but one unified interface.' },
              { label: 'Abstraction',   color: 'amber',   desc: 'Hiding complex implementation details behind simple contracts.' },
            ].map((pillar) => (
              <div
                key={pillar.label}
                className="glass-card flex flex-col justify-between rounded-2xl p-8 border border-white/5 text-center hover:bg-white/5 transition-all"
              >
                <div>
                  <div className={`w-3 h-3 rounded-full mx-auto mb-4 bg-${pillar.color}-500/80 shadow-[0_0_10px_currentColor] animate-pulse`} />
                  <p className={`font-mono text-sm font-bold text-${pillar.color}-400 mb-3 uppercase tracking-wider`}>
                    {pillar.label}
                  </p>
                </div>
                <p className="text-[#8b92a8] text-xs leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="py-12 text-center opacity-40 border-t border-white/5">
        <p className="text-[10px] font-mono tracking-[0.4em] uppercase">
          &copy; 2026 Mel Carl A. Chacon · BSIT 2-1 · OOP
        </p>
      </footer>
    </main>
  )
}