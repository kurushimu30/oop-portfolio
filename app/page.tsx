'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// --- 🔦 CURSOR LIGHT COMPONENT ---
function CursorLight() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { stiffness: 150, damping: 25 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 250) // Centering the 500px glow
      mouseY.set(e.clientY - 250)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <motion.div
      style={{ x, y }}
      className="fixed top-0 left-0 w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none z-0"
    />
  )
}

// --- ⌨️ TYPING EFFECT ---
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
    <span className="font-mono text-indigo-400">
      &#123;{words[index].substring(0, subIndex)}
      <span className="animate-pulse">|</span>&#125;
    </span>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen text-white selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Background Layer */}
      <CursorLight />
      <div className="fixed inset-0 grid-pattern opacity-[0.1] pointer-events-none -z-10" />
      
      {/* ── HERO SECTION ── */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 text-center lg:text-left z-10"
            >
              {/* MANDATORY METADATA */}
              <div className="mb-6 space-y-1">
                <p className="font-mono text-sm text-indigo-400 tracking-widest uppercase">
                  &gt; Mel Carl A. Chacon
                </p>
                <p className="text-xs text-[#8b92a8] font-mono tracking-tighter uppercase opacity-80">
                  Object-Oriented Programming | BSIT 2-1 | Polytechnic University of the Philippines
                </p>
              </div>

              <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
                Systematic
                <br />
                <Typewriter words={["Programming", "Architecture", "Engineering"]} />
              </h1>

              {/* MANDATORY INTRO */}
              <div className="mb-10 max-w-xl mx-auto lg:mx-0 p-6 glass-card border border-white/5 border-l-4 border-l-indigo-500 rounded-r-2xl bg-[#0f172a]/40">
                <p className="text-base sm:text-lg text-[#c9d1d9] leading-relaxed italic">
                  &quot;This e-portfolio presents my Midterm Project in Object-Oriented Programming using Next.js and Tailwind. 
                  It includes quizzes, activities, and exams that demonstrate my understanding of OOP concepts.&quot;
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/midterm" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20 active:scale-95">
                  Explore Archive
                </Link>
                <Link href="/contact" className="px-8 py-4 border border-white/10 hover:bg-white/5 text-[#c9d1d9] rounded-xl font-bold transition-all">
                  Get in Touch →
                </Link>
              </div>
            </motion.div>

            {/* Profile Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative z-10"
            >
              <div className="absolute -inset-4 bg-indigo-500/10 blur-2xl rounded-full" />
              <div className="relative w-64 h-64 md:w-100 md:h-125 rounded-3xl overflow-hidden border border-white/10 glass-card">
                <Image 
                  src="/me.png" 
                  alt="Mel Carl A. Chacon"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS SECTION ── */}
      <section className="px-6 relative z-20 -mt-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { val: '2', label: 'Quizzes', sub: 'Completed' },
              { val: '3', label: 'Seatworks', sub: 'Completed' },
              { val: '5', label: 'Activities', sub: 'Completed' },
            ].map((s) => (
              <motion.div 
                key={s.label}
                whileHover={{ y: -5, borderColor: 'rgba(99, 102, 241, 0.4)' }}
                className="glass-card rounded-2xl p-8 text-center border border-white/5 bg-[#0f172a]/60 backdrop-blur-xl"
              >
                <p className="font-mono text-4xl font-bold text-white mb-2">
                  {s.val}<span className="text-indigo-400">+</span>
                </p>
                <p className="text-sm font-semibold text-[#c9d1d9]">{s.label}</p>
                <p className="text-xs text-[#8b92a8] mt-1 uppercase tracking-widest opacity-60">{s.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENTO GRID ── */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            <div className="md:col-span-4 glass-card rounded-2xl p-8 border border-white/5">
              <h3 className="text-xl font-bold text-white mb-4">OOP in Java</h3>
              <p className="text-[#8b92a8] leading-relaxed text-sm">Applying encapsulation, modular methods, and state management through functional programs.</p>
              <div className="mt-8 flex gap-1.5 h-8">
                {[40, 70, 45, 90, 65, 80, 55, 95].map((h, i) => (
                  <div key={i} className="flex-1 bg-indigo-500/20 rounded-t-sm" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
            <div className="md:col-span-2 glass-card rounded-2xl p-8 border border-white/5">
              <h3 className="text-xl font-bold text-purple-300">C# Logic</h3>
              <p className="text-[#8b92a8] text-sm">Unity-based paradigms applied to Java type-checking.</p>
            </div>
            <div className="md:col-span-2 glass-card rounded-2xl p-8 border border-white/5 text-center flex flex-col items-center justify-center">
               <h3 className="text-xl font-bold text-emerald-300">PUP IT</h3>
               <p className="text-[#8b92a8] text-[10px] font-mono tracking-[0.2em] uppercase">S.Y. 2026</p>
            </div>
            <div className="md:col-span-4 glass-card rounded-2xl p-8 border border-white/5">
              <h3 className="text-xl font-bold text-amber-300">Systems Architecture</h3>
              <p className="text-[#8b92a8] text-sm leading-relaxed">Analyzing memory, state persistence, and resource cleanup to ensure system predictability.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section className="py-16 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { label: 'Java (OOP)', pct: 75 },
              { label: 'C# / Unity', pct: 85 },
              { label: 'Control Flow', pct: 90 },
              { label: 'State Management', pct: 78 }
            ].map((skill) => (
              <div key={skill.label}>
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-slate-300">{skill.label}</span>
                  <span className="text-indigo-400 font-mono">{skill.pct}%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.pct}%` }}
                    transition={{ duration: 1.5 }}
                    className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-20 text-center opacity-30">
        <p className="text-[10px] font-mono tracking-[0.4em] uppercase">
          &copy; 2026 Mel Carl A. Chacon · BSIT 2-1 · OOP
        </p>
      </footer>
    </main>
  )
}