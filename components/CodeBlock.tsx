'use client'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useState } from 'react'

// ─── SATURATED "ARK" THEME ───
// We start with the base VS Code theme, then overwrite the colors 
// to match your hyper-saturated screenshot.
const saturatedTheme = { ...vscDarkPlus }

saturatedTheme['keyword'] = { color: '#38bdf8' }      // Neon Blue (class, int, new, public)
saturatedTheme['class-name'] = { color: '#22d3ee' }   // Bright Cyan (Student, String, System)
saturatedTheme['builtin'] = { color: '#22d3ee' }      // Bright Cyan (System internals)
saturatedTheme['string'] = { color: '#4ade80' }       // Neon Green ("John", "Ana")
saturatedTheme['number'] = { color: '#fb923c' }       // Neon Orange (85, 90, 95)
saturatedTheme['function'] = { color: '#f8fafc' }     // Pure White (println, main)
saturatedTheme['punctuation'] = { color: '#64748b' }  // Darker Slate (brackets, semicolons)
saturatedTheme['operator'] = { color: '#94a3b8' }     // Lighter Slate (=, +, -)
saturatedTheme['comment'] = { color: '#6366f1', fontStyle: 'italic' } // Indigo Comments

// Ensure base text (like your variable names 's1', 'name', 'grade') is crisp white
if (saturatedTheme['code[class*="language-"]']) {
  saturatedTheme['code[class*="language-"]'].color = '#e2e8f0'
}

interface CodeBlockProps {
  filename: string
  code: string
}

export default function CodeBlock({ filename, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0d1117] shadow-2xl">
      
      {/* VS Code Style Mac Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="font-mono-code text-xs text-[#8b92a8]">{filename}</span>
        </div>
        <button
          onClick={handleCopy}
          className="text-xs font-mono-code text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      
      {/* Syntax Highlighting Body */}
      <div className="text-sm">
        <SyntaxHighlighter
          language="java"
          style={saturatedTheme}
          customStyle={{
            margin: 0,
            padding: '1.25rem',
            background: 'transparent',
            fontSize: '0.85rem',
            fontFamily: 'var(--mono)',
            lineHeight: '1.6' // Adds a bit more vertical breathing room like your screenshot
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}